import User from "../models/User.js"
import bcrypt from "bcrypt"


// register //

export const register = async(req, res)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been Created")
    } catch (error) {
        res.status(500).json(error)
        console.log("error=========>", error);
        
    }
}


// Login //
export const login = async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found..!")

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        !passwordCorrect && res.status(400).json("Wrong password")

        res.status(200).json(user);
        } catch (error) {
        res.status(500).json(error)
        console.log("error===========>" , error);
    }
};
