import { useNavigate } from "react-router-dom";
import "./Post.scss";

const Post = ({ title, text, imageLink, videoLink, authorEmail, createDate, id, tag }) => {

    const navigate = useNavigate();
    
    return (
        <article className='post' id={id}>
            {/* Post title */}
            <h2 onClick={() => navigate(`/posts/${id}`)}>{title}</h2>

            {/* Post author*/}
            <h3>Post on {tag}, Written by: {authorEmail} at {new Date(createDate).toUTCString()}</h3>
            
            {/* Post text */}
            <p>{text}</p>

            {/* Post video, shows only if the videoLink property is not null */}
            {videoLink &&
                <video controls>
                    <source src={videoLink} />
                </video> }

            {/* Post image, shows only if the imageLink property is not null  */}
            {imageLink &&
                <img src={imageLink} alt={title} /> }
        </article>
    )
}

export default Post