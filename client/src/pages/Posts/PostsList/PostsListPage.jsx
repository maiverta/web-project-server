import React, { useContext, useEffect, useState } from 'react'
import { getAllPosts, getMyPosts } from '../../../services/postsService';
import PostRow from './PostRow/PostRow';
import "./PostsListPage.scss";
import { useLocation } from 'react-router-dom';
// import { AppContext } from '../../../App';
import AuthContext from '../../../store/auth-context';



const PostsListPage = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation();  
    console.log(location.pathname);
    // const { user } = useContext(AppContext)
    const authCtx = useContext(AuthContext);


    useEffect(() => {
        
        const fetchData = async () => {
            let data;
            if(location.pathname.includes('myPosts')){
                console.log(authCtx.email)
                data= await getMyPosts(authCtx.email);
            }
            else{
             data = await getAllPosts();
            // }
            setPosts(data);
        }
        fetchData();
    }, [])

    return (
        <main className='posts-list-page'>
            <div className='table-header'>
                <span>Title</span>
                <span>Action</span>
            </div>
            {posts.map(post =>
                <PostRow
                    key={post._id} 
                    title={post.title}
                    id={post._id}
                    removePostFromList={() => setPosts(posts.filter(a => a._id !== post._id))}
                />)}
        </main>
    )
}

export default PostsListPage