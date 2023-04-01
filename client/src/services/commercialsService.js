export const getCommercials = async () => {

    //made to act like a server, waits a second and then replies
    const commercials = await fetch("http://localhost:5000/api/commercials")
        .then(res => res.json());

    return commercials;
}