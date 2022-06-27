require('../db');   
const user = require('../schemas/userSchema');


// get all users
exports.getAllUsers = async () => {
    return await user.find();
}

//addUser
exports.addUser = async (post) => {
    const newUser = new user({
        name: post.name,
        email: post.email,
        pass: post.pass
    });
    return await newUser.save();
}

//checkUser
exports.checkUser = async (post) => {
    return await user.findOne({email: post.email, pass: post.pass});
}





