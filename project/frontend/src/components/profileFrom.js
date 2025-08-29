import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

function ProfilePage({ userId }) {
  const [form, setForm] = useState({ name: "", phone: "", location: "" });
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/profile/${userId}`)
      .then(res => setProfile(res.data))
      .catch(() => {});
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("location", form.location);
    if (image) formData.append("image", image);

    const res = await axios.post("http://localhost:4000/api/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setProfile(res.data);
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Save</button>
      </form>

      {profile && (
        <div className="profile-display">
          <h3>{profile.name}</h3>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          {profile.image && <img src={`http://localhost:4000/${profile.image}`} alt="profile" />}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
