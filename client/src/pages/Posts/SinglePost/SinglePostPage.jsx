import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import { getPost } from '../../../services/postsService';
import "./SinglePostPage.scss";
import CommentExampleComment from '../../../components/Comment/Comment';

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
        <div className='post-page'>
            <div className='post'>
            {!post && <h2>Loading...</h2>}
            {post &&    <Post
            title={post.title}
            text={post.text}
            tag={post.tag}
            imageLink={post.imageLink}
            videoLink={post.videoLink}
            authorName={post.authorName}
            createDate={post.createDate}
            key={post.id}
            id={post.id}
          />}
          </div>

          <div>
            <h1>Comments</h1>
            <div className='comment-sectionn'>
                <CommentExampleComment className='comment-sectionn' postId={postId}></CommentExampleComment>
                </div>
          </div>
        </div>
    )
}

export default SinglePostPage





