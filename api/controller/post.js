import Post from "../models/Post.js";
import User from "../models/User.js";


// Create Post //
export const createPost = async(req, res) =>{
    const newPost = new Post(req.body)          
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
       res.status(500).json(error)
    }
}

// Update Post //
export const updatePost = async(req, res) =>{
    try {
    const post = await Post.findById(req.params.id);          
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("The post has been updated")
        } else{
            res.status(403).json("You can update only your post")
        }
    } catch (error) {
       res.status(500).json(error)
    }
}

// Delete Post //
export const deletePost = async(req, res) =>{
    try {
    const post = await Post.findById(req.params.id);          
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("The post has been deleted")
        } else{
            res.status(403).json("You can delete only your post")
        }
    } catch (error) {
       res.status(500).json(error)
    }
}

// Like, Dislike Post //
export const likePost = async(req, res) =>{
    try {
    const post = await Post.findById(req.params.id);          
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});

            res.status(200).json("The post has been liked")
        } else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
       res.status(500).json(error)
    }
}

// Get Post //
export const getPost = async(req, res) =>{
    try {
             const post = await Post.findById(req.params.id);          
             res.status(200).json(post);
    } catch(error){
       res.status(500).json(error)
    }
}

// Timeline Post //
export const timelinePost = async(req, res) =>{
             try{
                const currentUser = await User.findById(req.body.userId)
                const userPosts = await Post.find( {userId:currentUser._id})
                const friendPost = await Promise.all(
                    currentUser.following.map((friendId) =>{
                        return Post.find({userId: friendId});
                    })
                )
                res.json(userPosts.concat(...friendPost))
             } catch(error){
              res.status(500).json(error)
    }
}