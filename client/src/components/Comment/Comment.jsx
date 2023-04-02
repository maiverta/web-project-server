import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { addComment, getCommentsOfPost } from '../../services/commentService'
import AuthContext from '../../store/auth-context'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
const singleComment=(comment)=>{
    return (<Comment key={comment._id}>
        <PersonRoundedIcon></PersonRoundedIcon>
      <Comment.Content>
        <Comment.Author as='a'>{comment.user}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.updatedAt}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
       
      </Comment.Content>
    </Comment>)
}
const CommentExampleComment = ({postId}) => {
    const [postComments, setPostComments] = useState([])
    const [message, setMessage] = useState('');
    const commentText = useRef();
    const authCtx = useContext(AuthContext);


    useEffect(async() => {
        const postCommentsData = await getCommentsOfPost(postId);   
        setPostComments(postCommentsData);
    }, [])

    const handleAddComment= async ()=>{
        console.log(commentText.current.value)
        const newCommentToAdd= {
            text: commentText.current.value,
            user: authCtx.email,
            post: postId
        }
        const newComment = await addComment(newCommentToAdd);
        console.log(newComment)
        setPostComments((prev)=> [...prev, newComment])
    }

  return (<Comment.Group>
   
<div className='comment-section'>
   {postComments.map(comment=>{
    return singleComment(comment)
   }) }
   </div>
    <Form reply>
      <textarea ref={commentText}/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleAddComment}/>
    </Form>
  </Comment.Group>)
}

export default CommentExampleComment
