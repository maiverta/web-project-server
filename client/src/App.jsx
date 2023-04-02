import React, { useState } from 'react'
import "./App.css";
import NavigationBar from './components/NavigationBar/NavigationBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import Footer from './components/Footer/Footer';
import NewAuthorPage from './pages/Author/NewAuthor/NewAuthorPage';
import ManagementMenu from './components/ManagementMenu/ManagementMenu';
import EditAuthorPage from './pages/Author/EditAuthor/EditAuthorPage';
import NewPostPage from './pages/Posts/NewPost/NewPostPage';
import PostsListPage from './pages/Posts/PostsList/PostsListPage';
import EditPostPage from './pages/Posts/EditPost/EditPostPage';
import WeatherPopup from './components/WeatherPopup/WeatherPopup';
import StatisticsPage from './pages/Statistics/StatisticsPage';
import SinglePostPage from './pages/Posts/SinglePost/SinglePostPage';
import AuthorsListPage from './pages/Author/AuthorsList/AuthorsListPage';
import NewTagPage from './pages/Tags/NewTag/NewTagPage';
import EditTagPage from './pages/Tags/EditTag/EditTagPage';
import TagsListPage from './pages/Tags/TagsList/TagsListPage';
import MapLocationPage from './pages/Map/MapLocationPage';
import Com from './components/commercial';
import AuthPage from './pages/Login/AuthPage';
import UserProfile from './components/Profile/UserProfile';




//application context
export const AppContext = React.createContext();

//This is the root component of our application
const App = () => {  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    return (
        <div className="image">
        <AppContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    {/* <Route path='/auth' element={<AuthPage />} /> */}
                    <Route path='/' element={<HomePage />} />
                    <Route path='profile' element={<UserProfile />} />
                    <Route path='login' element={<AuthPage />} />
                    <Route path='/authors/new' element={<NewAuthorPage />} />
                    <Route path='/authors/edit/:authorName' element = {<EditAuthorPage />}/>
                    <Route path='/authors' element = {<AuthorsListPage />}/>
                    <Route path='/tags/new' element={<NewTagPage />} />
                    <Route path='/tags/edit/:tagId' element = {<EditTagPage />}/>
                    <Route path='/tags' element = {<TagsListPage />}/>
                    <Route path='posts/new' element={<NewPostPage />} />
                    <Route path='posts/edit/:postId' element={<EditPostPage />} />
                    <Route path='commercials' element={<Com/>} />
                    {/* <Route path='posts' element={<PostsListPage key='1'/>} /> */}
                    <Route path='myPosts' element={<PostsListPage key='1'/>} />
                    <Route path='posts/:postId' element={<SinglePostPage />} />
                    <Route path='statistics' element={<StatisticsPage />} />
                    <Route path='map' element={<MapLocationPage />} />
                </Routes>
                {/* <Footer /> */}
                <WeatherPopup />
            </BrowserRouter>
        </AppContext.Provider>
        </div>
    )
}

export default App