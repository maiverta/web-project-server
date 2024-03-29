import React, { useContext, useEffect, useRef, useState } from 'react'
import "./HomePage.scss";
import Post from '../../components/Post/Post';
import { getAllPosts, likePost } from "../../services/postsService";
import { useNavigate } from 'react-router-dom';
import { getSuggestedPostId } from '../../services/statisticsService';
import { getAllTags } from '../../services/tagsService';
import AuthContext from '../../store/auth-context';
import { AiOutlineLike , AiFillLike} from 'react-icons/ai';

const HomePage = () => {
  const [tags, setTags] = useState([]);
  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [filter, setFilter] = useState({ author: "", title: "", media: false });
  const [image, setImage] = useState(null);
  const tagFilterRef = useRef();
  const mediaFilterRef = useRef();
  const authorFilterRef = useRef();
  const titleFilterRef = useRef();
  const canvas = useRef(null);

  const navigate = useNavigate();

  const onClickLike=async (postId, isLike)=>{
    console.log(postId, isLike)
    const updatedPost = await likePost(postId, isLike, authCtx.email);
    console.log(updatedPost);

    const index = posts.findIndex(post=> post._id === postId);

    posts[index] = updatedPost;
    setPosts(()=> [...posts])
    console.log(posts)
  }

  useEffect(() => {
    const foodImage = new Image();
    foodImage.src = "https://i.pinimg.com/originals/7f/25/31/7f253177cb9e47749c3f3d4a9cfb6914.jpg";
    foodImage.onload = () => setImage(foodImage)
  },[])

  useEffect(()=>{
    // if(image && canvas) {
    //   const ctx = canvas.current.getContext("2d");
    //   ctx.fillStyle = "black";
    //   ctx.drawImage(image, (400 - 256) / 2, 40);
    // }
  },[image, canvas])


  useEffect(() => {
    let newVisiblePosts = posts.filter(post =>
      post.author?.includes(authorFilterRef.current?.value )
      && post.title?.includes(titleFilterRef.current?.value )
      && (tagFilterRef.current?.value === 'all' || post.tag?.includes(tagFilterRef.current?.value ))
    );

    if(filter.media){
      newVisiblePosts = newVisiblePosts.filter(post => post.imageLink || post.videoLink);
    }

    console.log(filter)
    setVisiblePosts(newVisiblePosts);
  }, [filter, posts]);

  //useEffect to run when the page loads
  useEffect(() => {

    //useEffect is synchronous, so we need to create a seperate asynchronous function for data fetching
    const fetchData = async () => {
      const data = await getAllTags();
      setTags([{name:"all"}, ...data]);
      //getting the data from the server
      setIsLoading(true);
      const posts = await getAllPosts();
      setIsLoading(false);

      //sets the posts list state
      setPosts(posts);
      setVisiblePosts(posts);

    }

    //gets all of the posts from the server and puts them in "posts" state
    fetchData();

  }, []);

  const goToSuggestedPost = async () => {
    const suggestedPostId = await getSuggestedPostId();
    navigate(`posts/${suggestedPostId}`);
  }
  return (
    <main className="homepage">      
      <section className='filter'>
        <span className='input-container'>
          <label htmlFor='author-filter'>Filter by author <br></br> Email</label>
          <input id='author-filter' placeholder='Author email' type="text" ref={authorFilterRef} onChange={(e) => setFilter({ ...filter, author: e.currentTarget.value })} />
        </span>
        <span className='input-container'>
        <label htmlFor='title-filter'>Filter by <br></br> Tag</label>
        <select placeholder='Tag' ref={tagFilterRef} defaultValue="1"  onChange={(e) => setFilter({ ...filter, tag: e.currentTarget.value })}>
                    <option value="None">None</option>
                    {tags && tags.map(tag => <option value={tag.name} >{tag.name}</option>)}
                </select>
        </span>
        <span className='input-container'>
          <label htmlFor='title-filter'>Filter by  <br></br>  Title</label>
          <input id='title-filter' placeholder='Title' type="text" ref={titleFilterRef} onChange={(e) => setFilter({ ...filter, title: e.currentTarget.value })} />
        </span>
        <span className='input-container'>
          <label htmlFor='media-filter'>Show only posts with media</label>
          <input id='media-filter' type="checkbox" ref={mediaFilterRef} onChange={(e) => setFilter({ ...filter, media: e.currentTarget.checked })} />
        </span>
      </section>

      {/* Shows loading indication while loading posts from server */}
      {isLoading && <h2>Loading posts...</h2>}

      {/* Goes through all of the posts, and renders them */}
      <div className='flex-posts'>{
        visiblePosts.map(post =>
          <div key={post._id}><Post
            title={post.title}
            text={post.text}
            tag={post.tag}
            imageLink={post.imageLink}
            videoLink={post.videoLink}
            authorEmail={post.author}
            createDate={post.createDate}
            likedUsers={post.likedByUsers}
            key={post._id}
            id={post._id}
          ></Post>
          <div>
          {post.likedByUsers?.findIndex(user=> user === authCtx.email) === -1 ?<AiOutlineLike onClick={()=> onClickLike(post._id,true)}></AiOutlineLike>  
          :<AiFillLike onClick={()=> onClickLike(post._id, false)}></AiFillLike>}</div></div>
         ) 
      }</div>
    </main>
  )
}

export default HomePage