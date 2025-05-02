import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, onRegisterModalSubmit, isOpen }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleAvatar = (event) => {
    setAvatar(event.target.value);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    onRegisterModalSubmit(name, avatar);
  };

  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Edit User"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={handleEditSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleName}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        avatar{" "}
        <input
          type="URL"
          className="modal__input"
          id="avatar"
          placeholder="Enter Avatar URL"
          value={avatar}
          onChange={handleAvatar}
        />
      </label>
      <button type="submit" className="modal__edit-profile">
        {" "}
        Save Changes{" "}
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
