import React, { useState } from 'react';
import "./styles.scss"
import Tooltip from '@mui/material/Tooltip';
import Catagory from '../catagory/catagory';

function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleBarIconClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <div className="barIcon" onClick={handleBarIconClick}>
                    <img src={isMenuOpen ? '/assets/icons/drop-down.png' : '/assets/icons/drop-down.png'} alt='' />
                </div>
                {isMenuOpen && (
                <div className="menuBar">
                    <ul>
                        <li>
                            <a href='#'>
                                <Tooltip title="Category" placement="right-start">
                                    <span>
                                        <Catagory />
                                    </span>
                                </Tooltip>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <Tooltip title="Calendar" placement="right-start">
                                    <img src='/assets/icons/timetable.png' alt='' />
                                </Tooltip>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <Tooltip title="Notes" placement="right-start">
                                    <img src='/assets/icons/notes.png' alt='' />
                                </Tooltip>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <Tooltip title="Mixer" placement="right-start">
                                    <img src='assets/icons/turntable.png' alt='' />
                                </Tooltip>
                            </a>
                        </li>
                        <li style={{ marginTop: "100px" }}>
                            <a href='#'>
                                <Tooltip title="Settings" placement="right-start">
                                    <img src='/assets/icons/setting.png' alt='' />
                                </Tooltip>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <Tooltip title="Login" placement="right-start">
                                    <img src='/assets/icons/user.png' alt='' />
                                </Tooltip>
                            </a>
                        </li>
                    </ul>
                </div>
                )}
            </div>
        </>
    )
}
export default Sidebar