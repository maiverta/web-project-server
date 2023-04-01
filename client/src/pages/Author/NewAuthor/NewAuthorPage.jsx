import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNewAuthor } from '../../../services/authorsService';
import AuthorForm from '../AuthorForm/AuthorForm';
import "./NewAuthorPage.scss";

const NewAuthorPage = () => {
  const navigate = useNavigate();

    const handleSubmit = (author) => {
        addNewAuthor(author);
        alert("Author added!")
        navigate("/");
    }

  return (
    <main className='new-author-page'>
      <AuthorForm 
        publishCallback={handleSubmit}
        formTitle={"Add New Author"}
      />
    </main>
  )
}

export default NewAuthorPage
