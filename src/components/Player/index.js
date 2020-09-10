import React from 'react';
import Sidebar from '../Sidebar'
import Body from '../Body';
import Footer from '../Footer';
import './index.css';

function Player({ spotify }){
    return (
        <div className="player">
            <div className="player__body">
               <Sidebar />
               <Body />
               <Footer />
            </div>
            {/* Sidebar  */}
        </div>
    )
}

export default Player;