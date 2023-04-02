import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../../../services/postsService';
import "./PostRow.scss";
const PostRow = ({ title, id, removePostFromList }) => {
    
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/posts/edit/${id}`);
    }
    const handleDeleteClick = () => {
        deletePost(id);
        removePostFromList();
    }
    return (
        <div className='post-row'>
            <span>{title}</span>
            <span>
                <button onClick={handleEditClick}>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </button>
                <button onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </span>
        </div>
    )
}

export default PostRow