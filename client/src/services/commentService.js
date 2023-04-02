export const getCommentsOfPost = async (postId) => {

    //made to act like a server, waits a second and then replies
    const comments = await fetch(`http://localhost:5000/api/comments/post/${postId}`)
        .then(res => res.json());

    return comments;
}

export const addComment = async (comment) => {
    let body = JSON.stringify(comment);
    console.log(body);
    const x = await fetch('http://localhost:5000/api/comments', {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    });
    return x.json();
}