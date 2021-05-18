import axios from 'axios';
import history from '../history';

export const createUser = (formValues) => {
    console.log(formValues);
    return async(dispatch) => {
        const res = await axios.post('/users', {...formValues});
        localStorage.setItem("token","Bearer " + res.data.token);
        dispatch({type: 'CREATE_USER', payload: res.data})
        if(res.status === 201) {
            console.log("Status: Okay");
            history.push('/home')
        }
    }
}

export const loginUser = (formValues) => {
    console.log("Action creator called");
    return async(dispatch) => {
        const res = await axios.post('/users/login', {...formValues});
        console.log(res);
        localStorage.setItem("token","Bearer "+res.data.token);
        dispatch({type:'LOGIN_USER', payload: res.data});
        
        if(res.status === 200) {
            console.log("Status: Okay");
            history.push('/home')
        }
    }
}

export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8000/users/me', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        dispatch({type: 'FETCH_USER', payload: res.data});
        history.push('/home')

        console.log(res.data);
    }
}

export const logoutUser = () => {
    return async(dispatch) => {
        console.log(localStorage.removeItem("token"))
        const res = await axios.post('http://localhost:8000/users/logoutAll', {
            headers: {
                Authorization: localStorage.getItem("token")
            }

        })
        console.log(res.data)

        dispatch({type: 'DELETE_USER', payload: res.data});
    }
}

export const fetchFriends = () => {
    return async(dispatch) => {
        const res = await axios.get('http://localhost:8000/me/home', {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        });


        dispatch({type: 'FETCH_FRIENDS', payload: res.data});
    }
}