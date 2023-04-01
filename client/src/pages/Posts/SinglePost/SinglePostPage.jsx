import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import { getPost } from '../../../services/postsService';
import "./SinglePostPage.scss";

const SinglePostPage = () => {

    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const post = await getPost(postId);
            setPost(post);
        }
        fetchData();
    }, [])

    return (
        <main className='post-page'>
            {!post && <h2>Loading...</h2>}
            {post && <div> 
                <h3></h3>
                authorName={post.authorName}
                createDate={post.createDate}
                imageLink={post.imageLink}
                text={post.text}
                title={post.title}
                videoLink={post.videoLink}
                id={postId}
                tag={post.tag}
                </div>}

        </main>
    )
}

export default SinglePostPage





