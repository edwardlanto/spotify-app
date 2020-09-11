import React from 'react';
import './index.css';

function SidebarOption({ title, Icon }){
    return (    
    <div className="sidebarOption">
        {Icon && <Icon className="sidebarOption__icon" />}
        {title &&  <h4>{title}</h4> }
    </div>)

}

export default SidebarOption;