import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordsItem from '../PasswordsItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Passwords extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordsInput: '',
    passwordsList: [],
    searchInput: '',
    isCheckboxChecked: false,
  }

  onAddingWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onAddingUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onAddingPassword = event => {
    this.setState({passwordsInput: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickAddNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordsInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordsInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordsInput: '',
    }))
  }

  onClickShowPasswords = () => {
    const {isCheckboxChecked} = this.state
    this.setState({isCheckboxChecked: !isCheckboxChecked})
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const updatedList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: updatedList})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordsInput,
      passwordsList,
      searchInput,
      isCheckboxChecked,
    } = this.state
    const searchResults = passwordsList.filter(eachPasswordItem =>
      eachPasswordItem.website
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    let passwordListContent
    if (passwordsList.length === 0) {
      passwordListContent = (
        <div className="no-password-page">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password-img"
          />
          <p className="no-password">No Passwords</p>
        </div>
      )
    } else if (searchResults.length === 0) {
      passwordListContent = (
        <div className="no-password-page">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password-img"
          />
          <p className="no-password">No Passwords</p>
        </div>
      )
    } else {
      passwordListContent = (
        <ul className="list-container">
          {searchResults.map(eachPasswordItem => (
            <PasswordsItem
              key={eachPasswordItem.id}
              passwordDetails={eachPasswordItem}
              deletePassword={this.onDeletePassword}
              isCheckboxChecked={isCheckboxChecked}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="password-manager-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="add-password-container">
          <div className="add-password-card">
            <h1 className="form-heading">Add New Password</h1>
            <form
              onSubmit={this.onClickAddNewPassword}
              className="password-form"
            >
              <div className="input-card">
                <div className="input-label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="label-img"
                  />
                </div>
                <input
                  type="text"
                  value={websiteInput}
                  onChange={this.onAddingWebsite}
                  placeholder="Enter Website"
                  className="form-input"
                />
              </div>
              <div className="input-card">
                <div className="input-label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="label-img"
                  />
                </div>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={this.onAddingUsername}
                  placeholder="Enter Username"
                  className="form-input"
                />
              </div>
              <div className="input-card">
                <div className="input-label">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="label-img"
                  />
                </div>
                <input
                  type="password"
                  value={passwordsInput}
                  onChange={this.onAddingPassword}
                  placeholder="Enter Password"
                  className="form-input"
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <img src="" alt="password manager" className="password-manager-img" />
        </div>
        <div className="password-list-container">
          <div className="password-status-card">
            <div className="password-length-card">
              <h1 className="password-heading">Your Passwords</h1>
              <div className="length-card">
                <p className="number-of-password">{passwordsList.length}</p>
              </div>
            </div>
            <div className="password-search-card">
              <div className="search-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                value={searchInput}
                onChange={this.onSearchInput}
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>
          <div className="show-password-card">
            <input
              type="checkbox"
              id="show-passwords"
              checked={isCheckboxChecked}
              onChange={this.onClickShowPasswords}
              className="no-password-input"
            />
            <label htmlFor="show-passwords" className="show-passwords">
              Show Passwords
            </label>
          </div>
          {passwordListContent}
        </div>
      </div>
    )
  }
}

export default Passwords
