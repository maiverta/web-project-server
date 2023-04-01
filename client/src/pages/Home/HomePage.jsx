import React, { useEffect, useRef, useState } from 'react'
import "./HomePage.scss";
import Post from '../../components/Post/Post';
import { getAllPosts } from "../../services/postsService";
import { useNavigate } from 'react-router-dom';
import { getSuggestedPostId } from '../../services/statisticsService';
const HomePage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [filter, setFilter] = useState({ author: "", title: "", media: false });
  const [image, setImage] = useState(null);

  const mediaFilterRef = useRef();
  const authorFilterRef = useRef();
  const titleFilterRef = useRef();
  const canvas = useRef(null);

  const navigate = useNavigate();

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
      post.authorName.includes(authorFilterRef.current.value)
      && post.title.includes(titleFilterRef.current.value)
    );

    if(filter.media){
      newVisiblePosts = newVisiblePosts.filter(post => post.imageLink || post.videoLink);
    }

    console.log(filter)
    setVisiblePosts(newVisiblePosts);
  }, [filter]);

  //useEffect to run when the page loads
  useEffect(() => {

    //useEffect is synchronous, so we need to create a seperate asynchronous function for data fetching
    const fetchData = async () => {

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
      <button onClick={goToSuggestedPost}>
        Click to suggest a post!
      </button>

      <section className='filter'>
        <span className='input-container'>
          <label htmlFor='author-filter'>Filter by author name</label>
          <input id='author-filter' placeholder='Author name' type="text" ref={authorFilterRef} onChange={(e) => setFilter({ ...filter, author: e.currentTarget.value })} />
        </span>
        <span className='input-container'>
          <label htmlFor='title-filter'>Filter by title</label>
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
      {
        visiblePosts.map(post =>
          <Post
            title={post.title}
            text={post.text}
            tag={post.tag}
            imageLink={post.imageLink}
            videoLink={post.videoLink}
            authorName={post.authorName}
            createDate={post.createDate}
            key={post.id}
            id={post.id}
          />)
      }
    </main>
  )
}

export default HomePage