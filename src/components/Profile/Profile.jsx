import React from "react";

export default function Profile({ user }) {
  return (
    <div className="profile">
      <h1>Welcome, {user.name}!</h1>

      {user.avatar && (
        <div className="avatar_container">
          <img src={user.avatar} alt="User avatar" className="profile_avatar" />
        </div>
      )}

      <div className="profile_info">
        {user.name && <p>Name: {user.name}</p>}
      </div>
    </div>
  );
}
