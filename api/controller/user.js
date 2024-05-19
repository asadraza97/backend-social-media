import User from "../models/User.js";
import bcrypt from "bcrypt"
import router from "../routes/auth.js";


// User Update //
export const updateUser = async(req, res) =>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error=====>", error);
    }
}

// User delete //

export const deleteUser = async(req, res, next) =>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been delete")
    } catch (error) {
        next(error);
    }
}

// Get User //

export const getUser = async(req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
       console.log("error======>,", error);
    }
}

// Follow User //

export const followUser = async(req, res) =>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push:{followers: req.body.userId}});
                await currentUser.updateOne({$push:{following: req.params.id}});
                res.status(200).json("User has been followed")
            } else{
                res.status(403).json("you already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else{
        res.status(403).json("You cant follow yourself")
    }
}

    // Unfollow user
    
    export const unfollowUser = async(req, res) =>{
        if(req.body.userId !== req.params.id){
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if (user.followers.includes(req.body.userId)) {
                    await user.updateOne({$pull:{followers: req.body.userId}});
                    await currentUser.updateOne({$pull:{following: req.params.id}});
                    res.status(200).json("User has been unfollowed")
                } else{
                    res.status(403).json("you dont follow this user")
                }
            } catch (error) {
                res.status(500).json(error)
            }
        } else{
            res.status(403).json("You cant unfollow yourself")
        }
}


// export const getUsers = async(req, res, next) =>{
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//     } catch (error) {
//         next(error);
//     }
// }