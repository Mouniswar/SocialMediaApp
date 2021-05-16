import React from 'react';
import { Link } from 'react-router-dom'

const HomeHeader = () => {
    return (
        <div className="ui secondary  menu">
            <Link to="/friends" className="item">Friends</Link>
            <Link to="/requests" className="item"> Friend Request</Link>
        </div>
    )
}

export default HomeHeader;