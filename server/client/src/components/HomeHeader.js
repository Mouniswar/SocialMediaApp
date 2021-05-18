import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends} from '../actions'

class HomeHeader extends Component {
    componentDidMount() {
        console.log("Component mounted");
        this.props.fetchFriends();
    }
    
    renderFriends = () => {
        console.log(this.props)
        if(!this.props.friend.friends) {
            console.log("......");
            return null;
        }
        else {
            const friendsList = this.props.friend.friends;
            console.log(friendsList, "Friends")
            return friendsList.map((eachfriend) => {
                return <div className="ui card" key={eachfriend._id}>
                    <div className="content">{eachfriend.name}</div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button">Add Friend</div>
                        </div>
                    </div>
                </div>
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Friends List</h1>
                {this.renderFriends()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { friend: state.friends}
}

export default connect(mapStateToProps, { fetchFriends })(HomeHeader);

  