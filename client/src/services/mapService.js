export const getAllLocations = async () => {

    //made to act like a server, waits a second and then replies
    const locations = await fetch("http://localhost:5000/api/maps")
        .then(res => res.json());

    return locations;
}