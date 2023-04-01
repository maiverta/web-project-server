export const getAllAuthors = async () => {

    const authors = await fetch("http://localhost:5000/api/users")
        .then(res => res.json());

    return authors;
}

export const getAllAuthorsDemo = async () => {
    await new Promise(t => setTimeout(t, 1000));
    const authors = await fetch("/api/authors")
        .then(res => res.json());
    
    return authors;
}

export const addNewAuthor = async (author) => {
    let body = JSON.stringify(author);
    console.log(body);
    await fetch('http://localhost:5000/api/users/signup', {
        method: "POST",
        body: JSON.stringify(author),
        headers: {
            "authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
}

export const deleteAuthor = async (authorName) => {
    await fetch(`http://localhost:5000/api/users/${authorName}`, {
        method: "DELETE",
        headers: {
            "authorization": localStorage.getItem('jwt')
        }
    }).then(res => res.json());
}

export const updateAuthor = async (authorName, author) => {
    await fetch(`http://localhost:5000/api/users/${authorName}`, {
        method: "PUT",
        body: JSON.stringify(author),
        headers: {
            "authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    })
}

export const getAuthor = async (authorId) => {
    const authors = await fetch(`http://localhost:5000/api/users/${authorId}`)
        .then(res => res.json());

    return authors;
}