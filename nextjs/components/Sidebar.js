import React from 'react'
import {
    HomeIcon,
    SearchIcon,
    LibraryICon,
    PlusCircleIcon
} from '@heroicons/react/outline';

function Sidebar() {
    return (
        <div>
            <div>
                <button>
                    <HomeIcon />
                    <p>Home</p>
                </button>
                <button>
                    <SearchIcon />
                    <p>Home</p>
                </button>
                <button>
                    <LibraryIcon />
                    <p>Home</p>
                </button>
                <button>
                    <HomeIcon />
                    <p>Home</p>
                </button>
            </div>
        </div>
    )
}

export default Sidebar
