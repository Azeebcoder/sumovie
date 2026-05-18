import React from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Moviedetail from './pages/Moviedetail.jsx'
import Navbar from './components/Navbar.jsx'
import MovieInfo from './pages/MovieInfo.jsx'
import { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import SearchMovie from './pages/SearchMovie.jsx'
import Footer from './components/Footer.jsx'
import WatchMovie from './pages/WatchMovie.jsx'
import InstallPWA from './InstallPWA.jsx'
import WatchTV from './pages/WatchTv.jsx'



const App = () => {

  return (
    <>
      <InstallPWA />
      <SkeletonTheme baseColor='#7e7e7e' highlightColor='#525252'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/movie/:id" element={<MovieInfo type="movie" similar={true} />} />
            <Route path="/tv/:id" element={<MovieInfo type="tv" similar={true} />} />
            <Route path='/movies/:type' element={<Moviedetail />} />
            <Route path='/movies/:type/:search' element={<SearchMovie />} />
            <Route path='/watch/movie/:id' element={<WatchMovie />} />
            <Route path='/watch/tv/:id' element={<WatchTV />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </SkeletonTheme>
    </>
  )
}

export default App