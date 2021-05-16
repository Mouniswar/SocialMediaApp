import { combineReducers} from 'redux';
import { reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import friendsReducer from './friendsReducer';

export default combineReducers({
    form: formReducer,
    authentication: authReducer,
    friends: friendsReducer
})