
import React from 'react';

const Header = (props) => {
    return (
        <header className="navbar-fixed">
            <nav className="teal lighten-2">
                <div className="nav-wrapper">
                    <div className="brand-logo center">{props.name}'s Notepad</div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
