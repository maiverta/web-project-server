import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthor, updateAuthor } from '../../../services/authorsService';
import AuthorForm from '../AuthorForm/AuthorForm';
import "./EditAuthorPage.scss";

const EditAuthorPage = () => {

  const [author, setAuthor] = useState();
  const { authorName } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log(authorName);
      const authors = await getAuthor(authorName);
      setAuthor(authors);
    }
    fetchData();

  }, []);

  const formSubmitted = (editedAuthor) => {
    updateAuthor(authorName, editedAuthor);
    alert("Author updated");
    navigate("/");
  }
  return (
    <main className='edit-author-page'>
      {
        author &&
        <AuthorForm
          formTitle="Edit Author"
          initialUsername = {author.username}
          initialFirstName = {author.firstName}
          initialLastName = {author.lastName}
          initialGender = {author.gender}
          initialPassword = {author.password}
          publishCallback={formSubmitted}
        />
      }
    </main>
  )
}

export default EditAuthorPage