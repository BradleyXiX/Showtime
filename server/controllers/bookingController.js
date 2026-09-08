import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js"
import stripe from 'stripe'
import mongoose from 'mongoose'


export const createBooking = async (req, res)=>{
    const session = await mongoose.startSession();
    try {
        const {userId} = req.auth();
        const {showId, selectedSeats} = req.body;
        const { origin } = req.headers;

        let booking, sessionUrl;

        await session.withTransaction(async () => {
            // Get the show details inside the transaction
            const showData = await Show.findById(showId).populate('movie').session(session);
            if (!showData) {
                throw new Error("Show not found.");
            }

            const occupiedSeats = showData.occupiedSeats || {};
            const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

            if(isAnySeatTaken){
                throw new Error("Selected Seats are no longer available.");
            }

            selectedSeats.forEach((seat)=>{
                showData.occupiedSeats[seat] = userId;
            });
            showData.markModified('occupiedSeats');

            await showData.save({ session });

            // Create a new booking
            booking = new Booking({
                user: userId,
                show: showId,
                amount: showData.showPrice * selectedSeats.length,
                bookedSeats: selectedSeats
            });
            await booking.save({ session });

            // Stripe Gateway Initialize
            const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

            const line_items = [{
                price_data: {
                    currency: 'usd',
                    product_data:{
                        name: showData.movie.title
                    },
                    unit_amount: Math.floor(booking.amount) * 100
                },
                quantity: 1
            }]

            const stripeSession = await stripeInstance.checkout.sessions.create({
                success_url: `${origin}/loading/my-bookings`,
                cancel_url: `${origin}/my-bookings`,
                line_items: line_items,
                mode: 'payment',
                metadata: {
                    bookingId: booking._id.toString()
                },
                expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
            })
            
            booking.paymentLink = stripeSession.url;
            await booking.save({ session });
            sessionUrl = stripeSession.url;
        });

        // Run Inngest Sheduler Function to check payment status after 10 minutes (outside transaction)
        await inngest.send({
            name: "app/checkpayment",
            data: {
                bookingId: booking._id.toString()
            }
        })

        res.json({success: true, url: sessionUrl})

    } catch (error) {
        console.log(error.message);
        if (error.message === "Selected Seats are no longer available.") {
            return res.status(409).json({success: false, message: error.message});
        }
        res.json({success: false, message: error.message})
    } finally {
        session.endSession();
    }
}

export const getOccupiedSeats = async (req, res)=>{
    try {
        
        const {showId} = req.params;
        const showData = await Show.findById(showId)

        if (!showData) {
            return res.json({success: false, message: "Show not found."})
        }

        const occupiedSeats = Object.keys(showData.occupiedSeats)

        res.json({success: true, occupiedSeats, version: showData.version})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}