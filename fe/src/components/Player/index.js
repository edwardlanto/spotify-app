import React from 'react';
import Body from '../Body';
import Footer from '../Footer';
import './index.css';

function Player({ spotify }){
    return (
        <div className="player">
            <div className="player__body">
               <Body />
               <Footer />
            </div>
            {/* Sidebar  */}
        </div>
    )
}

export default Player;