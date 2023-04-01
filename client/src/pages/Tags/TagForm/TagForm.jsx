import React, { useRef } from 'react'
import "./TagForm.scss";
const TagForm = ({publishCallback, formTitle, initialName}) => {
    const tagNameRef = useRef();
    const tagIdRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const tag = {
            name: tagNameRef.current.value
        }

        publishCallback(tag);
    }

    return (
        <div className='tag-form'>
            <h1>{formTitle}</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Tag Name' ref={tagNameRef} defaultValue={initialName}></input>
            <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default TagForm