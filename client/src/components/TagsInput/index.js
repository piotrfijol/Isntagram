import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import './TagsInput.scss'

export const TagsInput = ({ onChange, id, className }) => {
    const [value, setValue] = useState('');
    const [tags, setTags] = useState([]);
    const [error, setError] = useState('');
    const MAX_TAGS = 10;
    const MAX_TAG_LENGTH = 64;
    
    useEffect(() => {
        onChange(tags);
    }, [tags]);

    
    const handleClose = (ev) => {
        ev.preventDefault();
        
        const removedTagContent = ev.currentTarget.parentNode.textContent;
        setTags(tags.filter(tag => tag !== removedTagContent));
    };

    const handleChange = (ev) => {
        setError("");
        setValue(ev.target.value);
        const IS_SPACEBAR = ev.nativeEvent.data === " ";

        if(IS_SPACEBAR) {
            const inputString = ev.target.value;
            const index = inputString.indexOf(" ");
            const tag = inputString.slice(0, index);
            let isValid = true;
            
            if(tags.includes(tag)) {
                isValid = false;
                setError("You can't repeat the same tag for a single post")
            } else {
                setValue(inputString.slice(index+1));
            }


            const rules = [
                [/^[A-Za-z0-9]+$/, "Tags can only include alphanumeric characters."],
            ];

            rules.forEach((rule) => {
                if(!rule[0].test(tag)) {
                    setError(rule[1]);
                    isValid = false;
                }
            })

            if(isValid) {
                if(tag.length > MAX_TAG_LENGTH)
                    setError("Tag name can't be longer than 64 characters")
                else if(tags.length <= MAX_TAGS)
                    setTags((tags) => [...tags, tag]);
                else
                    setError("Max tags size reached");
            }
        }

    }

    return (
        <React.Fragment>
            <div className={className + " tags-input " + (error !== "" ? "error" : "")}  >
                {tags.map((tag) => (
                    
                    <div key={tag} className={"badge " + className}>
                        {tag}
                        <div className="badge__close" onClick={handleClose}>
                            <AiOutlineClose />
                        </div>
                    </div>
                ))}
                <input type="text" id={id} value={value} onChange={handleChange}/>
            </div>
            <p className="error-message">{error}</p>
        </React.Fragment>
    )
}
