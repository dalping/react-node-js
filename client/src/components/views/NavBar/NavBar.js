import React from 'react'
import {useSelector} from 'react-redux';
import './Navbar.css';
import MenuRight from './MenuRight';


function NavBar() {

    const user = useSelector(state => state.user_reducer);
    console.log(user);

    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
            
                <div className="menu_logo">
                    <a href="/">Pettlog</a>
                </div>
                <div className="menu_content">
                    <div className="navbar_left">
                        <div className="navbar_item">
                            <a href="/">Home</a>
                        </div>
                        <div className="navbar_item">
                            <a href="/">MyPage</a>
                        </div>
                        <div className="navbar_item">
                            <a href="/">Content</a>
                        </div>
                    </div>
                    <MenuRight/>
                    
                
            </div>
        </nav>
    )
}

export default NavBar
