
// TODO: this function currently returns data from ./mock/posts.json, we need to change it so it pulls data from the server
export const getAllPosts = async () => {

    //made to act like a server, waits a second and then replies
    const posts = await fetch("http://localhost:5000/api/posts")
        .then(res => res.json());

    return posts;
}

export const getMyPosts = async (email) => {
    console.log(email)
    //made to act like a server, waits a second and then replies
    const posts = await fetch(`http://localhost:5000/api/posts/user/${email}`)
        .then(res => res.json());

    return posts;
}

export const publishNewPost = async (post) => {
    let body = JSON.stringify(post);
    console.log(body);
    await fetch('http://localhost:5000/api/posts', {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            // "authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
}

export const deletePost = async (postId) => {
    await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            // "authorization": localStorage.getItem('jwt')
        }
    }).then(res => res.json());
}

export const updatePost = async (postId, post) => {
    await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
            // "authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    })
}

export const getPost = async (postId) => {
    const posts = await fetch(`http://localhost:5000/api/posts/${postId}`)
        .then(res => res.json());

    return posts;
}

