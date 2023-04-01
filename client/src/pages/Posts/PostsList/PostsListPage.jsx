import React, { useContext, useEffect, useState } from 'react'
import { getAllPosts, getMyPosts } from '../../../services/postsService';
import PostRow from './PostRow/PostRow';
import "./PostsListPage.scss";
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../App';


const PostsListPage = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation();  
    console.log(location.pathname);
    const { user } = useContext(AppContext)


    useEffect(() => {
        const fetchData = async () => {
            let data;
            if(location.pathname.includes('myPosts')){
                console.log(user)
                data= await getMyPosts(user._id);
            }
            else{
             data = await getAllPosts();
            }
            setPosts(data);
        }
        fetchData();
    }, [])

    return (
        <main className='posts-list-page'>
            <div className='table-header'>
                <span>Title</span>
                <span>Author</span>
                <span>Action</span>
            </div>
            {posts.map(post =>
                <PostRow
                    author={post.authorName}
                    key={post.id} title={post.title}
                    id={post.id}
                    removePostFromList={() => setPosts(posts.filter(a => a.id !== post.id))}
                />)}
        </main>
    )
}

export default PostsListPage