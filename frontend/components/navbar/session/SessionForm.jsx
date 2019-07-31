import React from 'react';
import { Link } from 'react-router-dom';
import SessionFormMessage from './SessionFormMessage';
import OtherFormMessage from './OtherFormMessage';
import SessionErrors from './SessionErrors';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    const { clearSessionErrors } = this.props;

    clearSessionErrors();
  }

  updateInput(field) {
    return e => (
      this.setState({
        [field]: e.currentTarget.value,
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const { processForm, history } = this.props;
    processForm(this.state)
      .then(() => history.push('/'));
  }

  render() {
    const { username, email, password } = this.state;
    const { formType, sessionErrors } = this.props;

    const usernameField = formType !== 'Signup' ? null : (
      <label htmlFor="username">
        USERNAME
        <input onChange={this.updateInput('username')} type="text" value={username} required />
      </label>
    );

    const forgotPassword = formType === 'Signup' ? null : (
      <Link to="/signup" className="forgot-password-link">Forgot your password?</Link>
    );

    return (
      <div className="session-form centered">
        <SessionErrors errors={sessionErrors} />
        <SessionFormMessage formType={formType} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            EMAIL
            <input onChange={this.updateInput('email')} type="email" value={email} required />
          </label>
          {usernameField}
          <label htmlFor="password">
            PASSWORD
            <input onChange={this.updateInput('password')} type="password" value={password} required />
          </label>
          {forgotPassword}
          <input type="submit" value={formType} />
        </form>
        <OtherFormMessage formType={formType} />
      </div>
    );
  }
}

export default SessionForm;
