import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AddNewTag } from '../../../services/tagsService';
import TagForm from '../TagForm/TagForm';
import "./NewTagPage.scss";
const NewTagPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (tag) => {
        AddNewTag(tag);
        alert("Tag was added!")
        navigate("/tags");
    }

    return (
        <main className='new-tag-page'>
            <TagForm 
                publishCallback={handleSubmit}
                formTitle={"Create new Tag"}
            />
        </main>
    )
}

export default NewTagPage