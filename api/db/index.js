import mongoose from "mongoose";

// DB connection 
const url = `mongodb+srv://asad:1234@social-media.vfusw7w.mongodb.net/?retryWrites=true&w=majority&appName=social-media
`;



mongoose.connect(url);

export default mongoose;

