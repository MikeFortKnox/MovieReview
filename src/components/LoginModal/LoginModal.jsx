import { useState } from "react";
import "./LoginModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ onClose, onLogin, isOpen, handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      onLogin(email, password, resetForm);
      // Optionally reset the form fields after submission
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={handleLoginSubmit}
    >
      <label htmlFor="email" className="modal__label">
        email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmail}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        password{" "}
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePassword}
        />
      </label>
      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Login
        </button>
        <button
          className="modal__to-register"
          type="button"
          onClick={handleRegister}
        >
          or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
