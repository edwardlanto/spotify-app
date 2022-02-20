import React from 'react';
import './index.css';
import { useHistory } from "react-router-dom";

function SidebarOption({ title, Icon, getPlaylist, id }){
    const history = useHistory();
    const handleGetPlaylist = (id) => {
        history.push('/')
        getPlaylist(id)
    }

    return (    
    <div className="sidebarOption">
        {Icon && <Icon className="sidebarOption__icon" />}
        {title &&  <button type="button" onClick={() => handleGetPlaylist(id)}><h4>{title}</h4></button> }
    </div>)

}

export default SidebarOption;