import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm}from 'redux-form';
import { Link } from 'react-router-dom';

class EditProfile extends Component {
    getInitailValues = () => {
        return {
            name: 'Mouniswar',
            email:'mouniswar7@gmail.com',
            city:'Kadapa',
            state:'AP'
        }
    }

    render() {
        // const { name, email, city, state} = this.props.initialValues;
        return (
            <form className="ui form" style={{width:'50%', height:'auto',margin:'0px auto'}} initialValues={this.getInitailValues()}>
               <div className="field">
                    <label>Enter Your Email ID</label>
                    <Field
                        name="email"
                        type="email"
                        label="name"
                        component="input"
                    />
                </div>
                <div className="field">
                    <label>Enter Your Name</label>
                    <Field
                        name="name"
                        type="text"
                        label="username"
                        component="input"
                    />
                </div>
                <div className="field">
                    <label>Select City</label>
                    <Field name="city" component="select" className="ui fluid dropdown">
                        <option />
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="delhi">New Delhi</option>
                    </Field>
                </div>
                <div className="field">
                    <label>Select State</label>
                    <Field name="state" component="select" className="ui fluid dropdown">
                        <option />
                        <option value="Ap">Andhra Pradesh</option>
                        <option value="Ka">Karnataka</option>
                        <option value="Tn">Tamilnadu</option>
                        <option value="Mh">Maharastra</option>
                        <option value="ND">New Delhi</option>
                    </Field>
                </div>
                <Link to="/home"><button className="ui primary button">Signup</button></Link>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    // return {
    //     initialValues: {
    //         email: state.authentication.userdata.email,
    //         name: state.authentication.userdata.name,
    //         city: state.authentication.userdata.city,
    //         state: state.authentication.userdata.state
    //     }
    //   }
    // console.log(state);

}

const EditProfileForm = reduxForm({form: 'edit', enableReinitialize:true})(EditProfile);
export default connect(mapStateToProps)(EditProfileForm)