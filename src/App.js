import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Searchbar, Sidebar, TopPlay } from './components/index'
import { TopCharts, Discover, TopArtists, ArtistDetails, SongDetails, Search, AroundYou } from './pages/index'

export default function App(){
  return (
    <div className='relative flex'>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286] ">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse ">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path='/' element={<Discover />} />
              <Route path='/top-artists' element={<TopArtists/>} />
              <Route path='/around-you' element={<AroundYou/>} />
              <Route path='/top-charts' element={<TopCharts/>} />
              <Route path='/artists/:id' element={<ArtistDetails/>} />
              <Route path='/songs/:songid' element={<SongDetails/>} />
              <Route path='/search/:searchTerm' element={<Search/>} />
            </Routes>
          </div>
          <div className='xl:sticky relative top-0 h-fit'>
            <TopPlay />
          </div>
        </div>
      </div>
    </div>
  )
}