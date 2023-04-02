import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllTags } from '../../../services/tagsService';
import { validatePost } from '../../../services/validationsService';
import "./PostForm.scss";
import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';

const PostForm = ({ publishCallback, formTitle, initialPostTitle, initialPostContent, initialImageLink, initialVideoLink, initialPostTag }) => {
    //
    const authCtx = useContext(AuthContext);
    const [tags, setTags] = useState([]);

    const postTitleRef = useRef();
    const postContentRef = useRef();
    const postImageLinkRef = useRef();
    const postVideoLinkRef = useRef();
    const postTagRef = useRef();


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllTags();
            setTags(data);
            console.log(postTagRef.current.options)
            for(let i = 0; i < postTagRef.current.options.length; i++){
                if(postTagRef.current.options[i].value == initialPostTag) 
                    postTagRef.current.selectedIndex = postTagRef.current.options[i].index
            }
        }
        fetchData();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const post = {
            title: postTitleRef.current.value,
            text: postContentRef.current.value,
            imageLink: postImageLinkRef.current.value,
            videoLink: postVideoLinkRef.current.value,
            tag: postTagRef.current.value,
            author: authCtx.email
            
        }

        const validationErrorMessage = validatePost(post);
        if (validationErrorMessage) {
            alert(validationErrorMessage);
            return;
        }
        publishCallback(post);
    }

    return (
        <div className='post-form'>
            <h1>{formTitle}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Post title' ref={postTitleRef} defaultValue={initialPostTitle}></input>
                <textarea placeholder='Post Content' ref={postContentRef} defaultValue={initialPostContent}></textarea>
                <input type="url" placeholder='Post Image Link' ref={postImageLinkRef} defaultValue={initialImageLink}></input>
                <input type="url" placeholder='Post Video Link' ref={postVideoLinkRef} defaultValue={initialVideoLink}></input>
                <select placeholder='Tag' ref={postTagRef} defaultValue="1">
                    <option value="None">None</option>
                    {tags && tags.map(tag => <option value={tag.name} defaultValue={initialPostTag}>{tag.name}</option>)}
                </select>
                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default PostForm