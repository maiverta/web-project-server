import React from 'react'
import { Link } from 'react-router-dom';
import "./ManagementMenu.scss";

const ManagementMenu = () => {
    return (
        <aside className='management-menu'>
            <Link to={"/authors/new"}>New Author</Link>
            <Link to={"/authors/"}>Manage Authors</Link>
            <Link to={"/posts/new"}>New Post</Link>
            <Link to={"/posts/"}>Manage Posts</Link>
            <Link to={"/tags/new"}>New Tag</Link>
            <Link to={"/tags/"}>Manage Tags</Link>
            <Link to={"/statistics"}>Statistics</Link>
        </aside>
    )
}

export default ManagementMenu