import React, { useRef, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { Avatar } from "../../components/Avatar";
import { PopUp } from '../../components/PopUp';
import "./EditProfile.scss";
import {useErrors} from "../../hooks/useErrors";

export const EditProfile = () => {
  const fileRef = useRef(null);
  const axiosPrivate = usePrivateAxios();
  const {auth, setAuth} = useAuth();
  const [bio, setBio] = useState(auth.profile.biography);
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const bioMaxLength = 350;
  const {setError} = useErrors();

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

  const editProfileInformation = (ev) => {
    ev.preventDefault();

    let form = new FormData();
    form.set("biography", bio);

    axiosPrivate("/api/account/edit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        biography: bio
      }
    }).then((response) => {
      console.log("Successful response");
      setAuth((prev) => {
        let obj = {...prev}
        obj.profile.biography = response.data.biography

        return obj;
      })
    }).catch((err) => {
      if(err.response) setError(err.response.data.message);
    });
  }

  const setAvatar = (ev) => {
    ev.preventDefault();

    let form = new FormData();
    form.set("file", fileRef.current.files[0]);

    axiosPrivate.post("/api/account/avatar", form)
      .then((response) => {
        setAuth((prev) => {
          let obj = {...prev}
          obj.profile.img = response.data.img
          
          return obj;
        })
      })
      .catch((err) => {
        if(err.response) setError(err.response.data.message);
      })
  };

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
          <form onSubmit={setAvatar}>
            <input type="file" ref={fileRef} />
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
      <form onSubmit={editProfileInformation}>
        <div className="col">
          <label htmlFor="biography">Biography</label>
          <textarea 
            value={bio} 
            onChange={handleChange} 
            placeholder="Your hobbies, links to your social media, etc."
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
