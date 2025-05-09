import React from "react";
import "./Profile.css";

export default function Profile({ user, onEditProfile }) {
  if (!user) {
    return <div className="profile"></div>;
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <h1>Welcome, {user.name}!</h1>
        <button className="profile__edit-button" onClick={onEditProfile}>
          Edit Profile
        </button>
      </div>

      <div className="profile__info">
        {user.name && <p className="profile__name">Name: {user.name}</p>}
      </div>
    </div>
  );
}
