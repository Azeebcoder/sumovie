import React from 'react'
import './App.css'
import Home from './pages/home/Home'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Moviedetail from './pages/movieDetail/Moviedetail'
import Navbar from './components/navbar/Navbar'
import MovieInfo from './pages/movieinfo/MovieInfo'
import { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import SearchMovie from './pages/searchMovie/SearchMovie'
import Footer from './components/footer/Footer'


const App = () => {
  
  return (
    <>
    <SkeletonTheme baseColor='#7e7e7e' highlightColor='#525252'>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:id' element={<MovieInfo/>} />
        <Route path='/movies/:type' element={<Moviedetail />} />
        <Route path='/movies/:type/:search' element={<SearchMovie/>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    </SkeletonTheme>
    </>
  )
}

export default App