import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_Token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = msg => {
    this.setState({errorMsg: msg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetials = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetials),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg} = this.state
    const msg = errorMsg !== '' ? errorMsg : ''
    const token = Cookies.get('jwt_Token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main_container">
        <div className="login_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
            className="website_login_img"
          />
          <div className="login_box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="website_login_logo"
            />
            <div>
              <form className="login_form" onSubmit={this.onSubmitForm}>
                <label className="label_ele" htmlFor="user">
                  USERNAME
                </label>
                <input
                  className="input_ele"
                  type="text"
                  id="user"
                  placeholder="Username"
                  onChange={this.onChangeUserName}
                />
                <label className="label_ele" htmlFor="pwd">
                  PASSWORD
                </label>
                <input
                  className="input_ele"
                  type="password"
                  id="pwd"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                />
                <button type="submit" className="login_btn">
                  Login
                </button>
                <p className="erroMsg">{msg}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
