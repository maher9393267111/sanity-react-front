import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import logo from '../asstes/logo.png'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar,UserProfile } from '../components';
import {userQuery } from '../utils/data'
import { client } from '../client';
import Pins from './Pins';
import { BrowserRouter as Router } from 'react-router-dom';
export default function Home() {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const [tail,settailw] =useState(true)
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();


  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
     // console.log(data[0],'------>data') // ---> [{user here}] 
    });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
    <div 
    // className= {tail ? 'bg-danger' : 'bg-black'}
    
     className={`   hidden md:flex h-screen flex-initial  bg-slate-400`}
    >
      <Sidebar user={user && user} />
    </div>

{/* small screens navbar with his sidebar */}

    <div className="flex md:hidden flex-col">
      <div className="p-2 w-full flex flex-row justify-between  shadow-md">
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
        </Link>
        {toggleSidebar && (
          // 4th item in flex in sm screens fixed well be in left side and sixze 4/5
        <div className="fixed w-4/5 bg-white h-screen  overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} toggleSidebar={toggleSidebar} user={user && user} />
        </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-auto  " ref={scrollRef}>
    
  
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route  path="/*" element={<Pins user={user && user} />} />
        </Routes>
      
    
      </div>

      </div>

{/* 
end small screens navbar and sidebar */}



      </div>
  )
}
