import React from 'react';
import './index.css';

function SidebarOption({ title, Icon, getPlaylist, id }){
    return (    
    <div className="sidebarOption">
        {Icon && <Icon className="sidebarOption__icon" />}
        {title &&  <button type="button" onClick={() => getPlaylist(id)}><h4>{title}</h4></button> }
    </div>)

}

export default SidebarOption;