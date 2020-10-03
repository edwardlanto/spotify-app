import React from 'react';
import './index.css';
import IconButton from "@material-ui/core/IconButton";

function SidebarOption({ title, Icon, getPlaylist, id }){
    return (    
    <div className="sidebarOption">
        {Icon && <Icon className="sidebarOption__icon" />}
        TEST
        {title &&  <button type="button" onClick={() => getPlaylist(id)}><h4>{title}</h4></button> }
    </div>)

}

export default SidebarOption;