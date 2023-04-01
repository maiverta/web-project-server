export const validatePassword = (password) => {
    if(password.length < 4 || password.length > 10)
    {
        return "Password must be between 4 and 10 characters long";
    }
    return null;
}

export const validateUsername = (username) => {
    if(username.length < 4 || username.length > 20){
        return "Username must be between 4 and 20 characters long";
    }
    
    return null;
}

export const validateFirstName = (firstName) => {
    const min = 2;
    const max = 15;

    if(!firstName.match("^[A-Za-z0-9]+$")) {
        return "First name must be letters only.";
    }

    if(firstName.length < min || firstName.length > max){
        return "First name must be between " + min + " and " + max + " characters long.";
    }
    
    return null;
}


export const validateLastName = (lastName) => {
    const min = 2;
    const max = 20;

    if(!lastName.match("^[A-Za-z0-9]+$")) {
        return "Last name must be letters only.";
    }

    if(lastName.length < min || lastName.length > max){
        return "Last name must be between " + min + " and " + max + " characters long.";
    }
    
    return null;
}


export const validateGender = (gender) => {

    if(!(gender === "Male" || gender === "Female")) {
        return "Please choose a gender.";
    }

    return null;
}

export const validatePost = (post) => {
    if(!post.title){
        return "Please enter post title"
    }

    if(!post.text){
        return "Please enter post text";
    }

    return null;
}