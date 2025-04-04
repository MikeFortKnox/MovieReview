import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ isLoggedIn, onLoginButtonClick, onRegisterButtonClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      {!isLoggedIn && (
        <>
          <button
            onClick={onRegisterButtonClick}
            type="button"
            className="header__register-button"
          >
            SignUp
          </button>
          <button
            onClick={onLoginButtonClick}
            type="button"
            className="header__signin-button"
          >
            Login
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <p className="header__username">{currentUser.name}</p>
          <Link to="/profile" className="header__link">
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="header__avatar"
            />
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
