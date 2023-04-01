import React, { useEffect, useState } from 'react'
import { getAllTags } from '../../../services/tagsService';
import TagRow from './TagRow/TagRow';
import { Link } from 'react-router-dom';

import "./TagsListPage.scss";

const TagsListPage = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllTags();
            setTags(data);
        }
        fetchData();
    }, [])

    return (
        <div>            <Link to={"/tags/new"}>New Tag</Link>
        <main className='tags-list-page'>
            <div className='table-header'>
                <span>Id</span>
                <span>Name</span>
                <span>Action</span>
            </div>
            {tags.map(tag =>
                <TagRow
                    name={tag.name}
                    key={tag._id} 
                    id={tag._id}
                    removeTagFromList={() => setTags(tags.filter(a => a._id !== tag._id))}
                />)}
        </main>
        </div>

    )
}

export default TagsListPage