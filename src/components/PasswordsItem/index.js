import './index.css'

const PasswordsItem = props => {
  const {passwordDetails, deletePassword, isCheckboxChecked} = props
  const {id, website, username, password, initialClassName} = passwordDetails

  const onDeletePasswordItem = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className={`website-profile ${initialClassName}`}>
        <p className="logo-text">{website[0].toUpperCase()}</p>
      </div>
      <div className="password-detail">
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {isCheckboxChecked ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="star-img"
          />
        )}
      </div>
      <button
        type="button"
        data-testid="delete"
        onClick={onDeletePasswordItem}
        className="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordsItem
