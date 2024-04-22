
import mongoose from "mongoose"

// schema

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true,

    },
    description:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true
    },

    body:{
        type: String,
        required: true
    },
   
    owner: { type: mongoose.Schema.Types.ObjectId, ref:"users", required: true },

    state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    read_count:{
        type: Number,
        default: 0
         
    },
    reading_time:{
      type: Number,
      default: 0
    },
   
    tags:
        [{type: String}]
    
},
    {
        timestamps:true
    }
);

blogSchema.methods.read = async function (){
    this.read_count++;
    this.reading_time = calculateReadingTime(this.body);
    await this.save();
}

function calculateReadingTime(content) {
    // Assuming average reading speed of 200 words per minute
    const words = content.split(' ').length;
    return Math.ceil(words / 200);
}
// model
export const Blog = mongoose.model("blogs", blogSchema)