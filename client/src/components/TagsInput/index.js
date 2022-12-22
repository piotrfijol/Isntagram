import React, { useEffect, useState } from 'react'
import { Badge } from './Badge'
import './TagsInput.scss'

export const TagsInput = ({ onCreate }) => {
    const [value, setValue] = useState('');
    const [tags, setTags] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        onCreate(tags);
    }, [tags]);

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
                setTags((tags) => [...tags, tag]);
            }
        }

    }

    return (
        <React.Fragment>
            <div className={"tags-input " + (error !== "" ? "error" : "")}  >
                {tags.map((tag) => <Badge value={tag} key={tag}/>)}
                <input type="text" value={value} onChange={handleChange}/>
            </div>
            <p className="error-message">{error}</p>
        </React.Fragment>
    )
}
