import React from 'react'
import Chat from '../features/Chat'
import Sidebar from '../features/Sidebar'

const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home