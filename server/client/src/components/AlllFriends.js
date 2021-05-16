import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends} from '../actions'

class AllFriends extends Component {
    componentDidMount() {
        this.props.fetchFriends();
    }
    
    renderFriends = () => {
        // console.log(this.props)
        if(!this.props.friend.friends) {
            return null;
        }
        else {
            const friendsList = this.props.friend.friends;
            console.log(friendsList, "Friends")
            friendsList.map((eachfriend) => {
                console.log(`He is my ${eachfriend.name}`);
                return (
                    <div className="ui card">
                        <div className="content">{eachfriend.name}</div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <div className="ui basic green button">Approve</div>
                                    <div className="ui basic red button">Reject</div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Friends List</h1>
                {this.friendName}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { friend: state.friends}
}

export default connect(mapStateToProps, { fetchFriends })(AllFriends);

  