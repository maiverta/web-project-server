import React, { useEffect, useState } from 'react'
import { getAllAuthors, getAllAuthorsDemo } from '../../../services/authorsService';
import AuthorRow from './AuthorRow/AuthorRow';
import "./AuthorsListPage.scss";


const AuthorsListPage = () => {
  const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllAuthors();
            setAuthors(data);
        }
        fetchData();
    }, [])

    return (
        <main className='authors-list-page'>
            <div className='table-header'>
                <span>Username</span>
                <span>FirstName</span>
                <span>LastName</span>
                <span>Action</span>
            </div>
            {authors.map(author =>
                <AuthorRow
                    username={author.username}
                    firstName={author.firstName}
                    lastName={author.lastName}
                    key={author._id}
                    id={author._id}
                    removeAuthorFromList={() => setAuthors(authors.filter(a => a._id !== author._id))}
                />)}
        </main>
    )
}

export default AuthorsListPage