import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/movies/:id/:date' element={<SeatLayout/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/Favorite' element={<Favorite/>} />
      </Routes>
    </>
  )
}

export default App