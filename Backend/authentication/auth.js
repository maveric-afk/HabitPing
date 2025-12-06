const jwt=require('jsonwebtoken');

function setUser(user){
    if(!user){
        return null;
    }
    const token=jwt.sign({
        Id:user._id,
        Name:user.NickName,
        Email:user.Email
    },process.env.JWT_SECRET_KEY)

    return token;
}

function getUser(token){
    if(!token){
        return null;
    }
    const user=jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!user){
        return null;
    }
    return user;
}

module.exports={setUser,getUser}