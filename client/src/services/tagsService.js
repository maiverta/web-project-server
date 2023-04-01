
export const getAllTags = async () => {

    //made to act like a server, waits a second and then replies
    const tags = await fetch("http://localhost:5000/api/tags")
        .then(res => res.json());

    return tags;
}

export const AddNewTag = async (tag) => {
    let body = JSON.stringify(tag);
    console.log(body);
    await fetch('http://localhost:5000/api/tags', {
        method: "POST",
        body: JSON.stringify(tag),
        headers: {
            "authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
}

export const deleteTag = async (tagId) => {
    await fetch(`http://localhost:5000/api/tags/${tagId}`, {
        method: "DELETE",
        headers: {
            "authorization": localStorage.getItem('jwt')
        }
    }).then(res => res.json());
}

export const updateTag = async (tagId, tag) => {
    await fetch(`http://localhost:5000/api/tags/${tagId}`, {
        method: "PUT",
        body: JSON.stringify(tag),
        headers: {
            "authorization": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    })
}

export const getTag = async (tagId) => {
    const tags = await fetch(`http://localhost:5000/api/tags/${tagId}`)
        .then(res => res.json());

    return tags;
}