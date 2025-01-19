import React from 'react'
import './App.css'
import Home from './pages/home/Home'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Moviedetail from './pages/movieDetail/Moviedetail'
import Navbar from './components/navbar/Navbar'
import MovieInfo from './pages/movieinfo/MovieInfo'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:id' element={<MovieInfo/>} />
        <Route path='/movies/:type' element={<Moviedetail/>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App