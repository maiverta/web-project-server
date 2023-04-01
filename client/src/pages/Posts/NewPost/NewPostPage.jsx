import React from 'react'
import { useNavigate } from 'react-router-dom';
import { publishNewPost } from '../../../services/postsService';
import PostForm from '../PostForm/PostForm';
import "./NewPostPage.scss";
const NewPostPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (post) => {
        publishNewPost(post);
        alert("Post published!")
        navigate("/");
    }

    return (
        <main className='new-post-page'>
            <PostForm 
                publishCallback={handleSubmit}
                formTitle={"Create new post"}
            />
        </main>
    )
}

export default NewPostPage