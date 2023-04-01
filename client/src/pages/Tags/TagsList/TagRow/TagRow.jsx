import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteTag } from '../../../../services/tagsService';
import "./TagRow.scss";
const TagRow = ({name, id, removeTagFromList}) => {
    
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/tags/edit/${id}`);
    }
    const handleDeleteClick = () => {
        deleteTag(id);
        removeTagFromList();
    }
    return (
        <div className='tag-row'>
            <span>{id}</span>
            <span>{name}</span>
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

export default TagRow