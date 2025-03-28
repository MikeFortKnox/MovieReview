import { useState } from "react";
import "./RegisterModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  onClose,
  onRegisterModalSubmit,
  isOpen,
  handleLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleAvatar = (event) => {
    setAvatar(event.target.value);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    onRegisterModalSubmit(name, email, password, avatar, resetForm);
  };

  function resetForm() {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }

  return (
    <ModalWithForm
      title="Register"
      buttonText="Add User"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={handleRegisterSubmit}
    >
      <label htmlFor="register__name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register__name"
          placeholder="Name"
          value={name}
          onChange={handleName}
        />
      </label>
      <label htmlFor="register__email" className="modal__label">
        email{" "}
        <input
          type="email"
          className="modal__input"
          id="register__email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmail}
        />
      </label>

      <label htmlFor="register__password" className="modal__label">
        password{" "}
        <input
          type="text"
          className="modal__input"
          id="register__password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePassword}
        />
      </label>
      <label htmlFor="register__avatar" className="modal__label">
        avatar{" "}
        <input
          type="URL"
          className="modal__input"
          id="register__avatar"
          placeholder="Enter Avatar URL"
          value={avatar}
          onChange={handleAvatar}
        />
      </label>
      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Register
        </button>
        <button className="modal__to-login" type="button" onClick={handleLogin}>
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
