import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTag, updateTag } from '../../../services/tagsService';
import TagForm from '../TagForm/TagForm';
import "./EditTagPage.scss";

const EditTagPage = () => {

  const [tag, setTag] = useState();
  const { tagId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log(tagId);
      const tags = await getTag(tagId);
      setTag(tags);
    }
    fetchData();

  }, []);

  const formSubmitted = (editedTag) => {
    updateTag(tagId, editedTag);
    alert("Tag updated");
    navigate("/tags");
  }
  return (
    <main className='edit-tag-page'>
      {
        tag &&
        <TagForm
          formTitle="Edit Tag"
          initialName={tag.name}
          publishCallback={formSubmitted}
        />
      }
    </main>
  )
}

export default EditTagPage