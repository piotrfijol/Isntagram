import React, { useRef, useState } from 'react'
import TextInput from '../../components/TextInput'
import "./CreatePost.scss";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { TagsInput } from '../../components/TagsInput';

export const CreatePost = () => {
    
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const fileInput = useRef(null);
    const axiosPrivate = usePrivateAxios();

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
            
        });
    };


    const handleNewTag = (tags) => {
        setTags(tags);
    };

  return (
    <form onSubmit={handleSubmit}>
        <TextInput 
            label="Description" 
            id="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
        />
        <label htmlFor="post-image" className="file-label">
        </label>
        <input ref={fileInput} type="file" id="post-image"/>
        <TagsInput onCreate={handleNewTag}/>
        <button type="submit">Create post</button>
    </form>
  )
}
