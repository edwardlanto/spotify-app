import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SongList(){
    const [likedSongs, setLikedSongs] = useState(null);
    useEffect(() => {
        window.location.hash = "";
        const fetchLikedSongs = async () => {
            const _likedSongs = await axios.get('/home');
            console.log('liked', likedSongs);
            setLikedSongs(_likedSongs);
        }
        
        fetchLikedSongs();
        console.log(likedSongs);
    }, []);
    
    return (
    <div>TEST</div>
    )
}

export default SongList;