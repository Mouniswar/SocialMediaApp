import React from 'react';
import{ fetchUser } from '../actions' 
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

class Home extends React.Component {
    componentDidMount() {
        console.log(localStorage.getItem("token"));
        this.props.fetchUser();
    }

    render() {
        return (
            <HomeHeader />
        )
    }
}

export default connect(null, {fetchUser})(Home);