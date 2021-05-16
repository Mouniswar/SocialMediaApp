import React from 'react';
import Header from './Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import EditProfile from './EditProfile';
import { Landing } from './Landing';
import AllFriends from './AlllFriends';

const App = () => {
    return (
        <div className="ui container">
            <div>
                <BrowserRouter>
                    <Header /> 
                    <Route path="/" exact component={Landing} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/profile" exact component={EditProfile} />
                    <Route path="/friends" exact component={AllFriends} />
                </BrowserRouter> 
            </div>
        </div>
    )
}

export default App;