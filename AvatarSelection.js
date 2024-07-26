import React, { useState } from "react";
import axios from "axios";
import "./AvatarSelection.css";

const avatars = [
  "https://starwars-visualguide.com/assets/img/characters/1.jpg", // Luke Skywalker
  "https://starwars-visualguide.com/assets/img/characters/2.jpg", // C-3PO
  "https://starwars-visualguide.com/assets/img/characters/3.jpg", // R2-D2
  // Add more Star Wars character URLs here
];

function AvatarSelection({ onAvatarSelect }) {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleAvatarSelect = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3001/update-avatar",
      { avatar: selectedAvatar },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    onAvatarSelect();
  };

  return (
    <div className="avatar-selection-container">
      <h2>Select Your Avatar</h2>
      <div className="avatar-container">
        {avatars.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Avatar ${index}`}
            className={`avatar ${selectedAvatar === url ? "selected" : ""}`}
            onClick={() => setSelectedAvatar(url)}
          />
        ))}
      </div>
      <button className="select-button" onClick={handleAvatarSelect}>
        Select Avatar
      </button>
    </div>
  );
}

export default AvatarSelection;
