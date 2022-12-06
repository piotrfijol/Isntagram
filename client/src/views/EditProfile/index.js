import React, { useRef, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { Avatar } from "../../components/Avatar";
import { PopUp } from '../../components/PopUp';
import "./EditProfile.scss";

export const EditProfile = () => {
  const fileRef = useRef(null);
  const [bio, setBio] = useState("");
  const axiosPrivate = usePrivateAxios();
  const {auth} = useAuth();
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const bioMaxLength = 350;

  const handleChange = (ev) => {
    if(ev.target.value < bioMaxLength)
      setBio(ev.target.value);
    else
      setBio(ev.target.value.slice(0, bioMaxLength));
  };

  const handlePopupOpen = (ev) => {
    setIsAvatarPopup(true);
  };

  const handlePopupClose = (ev) => {
    setIsAvatarPopup(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    let form = new FormData();
    form.set("file", fileRef.current.files[0]);
    form.set("biography", bio);

    axiosPrivate.post("/api/account/edit", {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log("Successful response");
    }).catch((err) => {
      console.error("Something went wrong");
    });
  }

  return (
    <div className="settings-content">
      <div className="settings-content__avatar">
        <div style={{ display: "flex" }}>
          <Avatar user={auth} className="settings-content__avatar__preview"/>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: ".5rem"
          }}>
            <h2 className="settings-content__avatar__username">{auth.username}</h2>
            <a href="#" onClick={handlePopupOpen}>Change profile picture</a>
          </div>
        </div>
        <PopUp title="Add new avatar" isVisible={isAvatarPopup} onClose={handlePopupClose}>
          <form>
            <input type="file" />
            <button style={{
                margin: "1rem"
              }}
              className="btn" 
              type="submit"
            >
              Save
            </button>
          </form>
        </PopUp>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col">
          <label for="biography">Biography</label>
          <textarea 
            value={bio} 
            onChange={handleChange} 
            placeholder="Your hobbies, links to your other social media, etc."
            id="biography"
            >
            </textarea>
            <p className={"char-counter" + ((bio.length >= bioMaxLength) ? " text-error" : "")}>{bio.length}/{bioMaxLength}</p>
        </div>
        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  )
}
