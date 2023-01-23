import React, { useRef, useState } from 'react'
import "./CreatePost.scss";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { TagsInput } from '../../components/TagsInput';
import { useErrors } from "../../hooks/useErrors";
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
    
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const fileInput = useRef(null);
    const axiosPrivate = usePrivateAxios();
    const {setError} = useErrors();
    const navigate = useNavigate();

    const handleSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append("file", fileInput.current.files[0]);
        formData.append("description", description);
        formData.append("tags", tags.join("#"));

        axiosPrivate.post("/api/post", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            navigate("/")
        }).catch((err) => {
            setError(err.response.data.message);
        });
    };


    const handleNewTag = (tags) => {
        setTags(tags);
    };

  return (
    <div className="create-post">
        <form onSubmit={handleSubmit}>
            <div className="row">
                <label htmlFor='post-description'>Description</label>
                <textarea 
                    name="description" 
                    id="post-description" 
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                >
                </textarea>
            </div>
            <div className="row">
                <label htmlFor='post-image'>Choose a picture: </label>
                <input ref={fileInput} type="file" id="post-image"/>
            </div>
            <div className="row">
                <label style={{marginBottom: ".5rem", display: "inline-block"}} htmlFor='post-tags'>Tags</label>
                <TagsInput className="tags-container" id="post-tags" onCreate={handleNewTag}/>
            </div>
            <button type="submit" className="btn create-post__btn">Create post</button>
        </form>
    </div>
  )
}
