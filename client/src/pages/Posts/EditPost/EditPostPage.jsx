import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../../../services/postsService';
import PostForm from "../PostForm/PostForm";
import "./EditPostPage.scss";

const EditPostPage = () => {

  const [post, setPost] = useState();
  const { postId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log(postId);
      const posts = await getPost(postId);
      setPost(posts);
    }
    fetchData();

  }, []);

  const formSubmitted = (editedPost) => {
    updatePost(postId, editedPost);
    alert("Post updated");
    navigate("/");
  }
  return (
    <main className='edit-post-page'>
      {
        post &&
        <PostForm
          formTitle="Edit Post"
          initialImageLink={post.imageLink}
          initialPostTitle={post.title}
          publishCallback={formSubmitted}
          initialPostContent={post.text}
          initialPostTag={post.tag}
        />
      }
    </main>
  )
}

export default EditPostPage