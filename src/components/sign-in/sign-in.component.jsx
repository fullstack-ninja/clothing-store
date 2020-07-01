import React from "react";
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { email, password } = this.state;
    const { emailSignInStart } = this.props;

    emailSignInStart(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            handlechange={this.handleChange}
            label="Email"
            name="email"
            type="text"
            value={email}
            required
          />
          <FormInput
            handlechange={this.handleChange}
            label="Password"
            name="password"
            type="password"
            value={password}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDistpatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDistpatchToProps)(SignIn);