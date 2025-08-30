import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";

function ProfilePage({ userId }) {
  const [form, setForm] = useState({ name: "", phone: "", location: "" });
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);

  // Fetch profile on load
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/profile/${userId}`)
      .then((res) => {
        setProfile(res.data);
        // Pre-fill form with existing profile data
        if (res.data) {
          setForm({
            name: res.data.name || "",
            phone: res.data.phone || "",
            location: res.data.location || "",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [userId]);

  // Save profile
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("location", form.location);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:4000/api/profile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfile(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile. Try again!");
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
       <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
       
        <button type="submit">Save</button>
      </form>

      {profile && (
        <div className="profile-display">
          <h3>{profile.name}</h3>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          {profile.image && (
            <img
              src={`http://localhost:4000/${profile.image}`}
              alt="profile"
              width="150"
              height="150"
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
