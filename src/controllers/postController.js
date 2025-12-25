import { createPostService } from '../services/postService.js'

export async function createPost(req, res) {
    console.log("File uploaded to S3:", req.file);
    // Here, you would typically save the post details (including imageUrl) to your database
    
    const post = await createPostService({
        caption: req.body.caption,
        imageUrl: req.file.location
    });

    return res.status(201).json({
        success: true,//indicates the request was successful
        message: "Post created successfully",
        data: post//return the created post object
    });
}

