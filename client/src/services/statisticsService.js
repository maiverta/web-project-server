export const getTagsStats = async() => {
    const tagsStats = await fetch("http://localhost:5000/api/stats/tags")
        .then(res => res.json());

    return tagsStats;
}

export const getAuthorsStats = async() => {
    const authorsStats = await fetch("http://localhost:5000/api/stats/authors")
        .then(res => res.json());

    return authorsStats;
}

export const getSuggestedPostId = async () => {
    const suggestedPostId = await fetch(`http://localhost:5000/api/stats/suggestedPost`, {
        method: "GET",
        headers: {
            // "authorization": localStorage.getItem('jwt'),
        }
    })
    .then(res => res.text())
    .then(res => res.substring(1, res.length - 1));

    return suggestedPostId;
}