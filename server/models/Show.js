import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
    {
        movie: {type: String, required: true, ref: 'Movie'},
        showDateTime: { type: Date, required: true },
        showPrice: { type: Number, required: true },
        occupiedSeats: { type: Object, default:{} } ,
        version: { type: Number, default: 0 }
    }, { minimize: false}
)

const Show = mongoose.model("Show", showSchema);

export default Show;