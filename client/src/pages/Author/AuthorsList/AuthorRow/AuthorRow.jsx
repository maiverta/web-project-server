import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteAuthor } from '../../../../services/authorsService';
import "./AuthorRow.scss";

const AuthorRow = ({username, firstName, lastName, id, removeAuthorFromList}) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/authors/edit/${username}`);
    }
    const handleDeleteClick = () => {
        deleteAuthor(username);
        removeAuthorFromList();
    }

    return (
        <div className='author-row'>
            <span>{username}</span>
            <span>{firstName}</span>
            <span>{lastName}</span>
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
export default AuthorRow
