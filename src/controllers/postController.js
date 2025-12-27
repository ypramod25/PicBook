import { createPostService, deletePostByIdService, getAllPostsService } from '../services/postService.js'

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

//api/v1/posts?limit=10&offset=0
export async function getAllPosts(req, res) {
    // Here, you would typically fetch all posts from your database
    try{
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 10;
        const paginatedPosts = await getAllPostsService(offset, limit);

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: paginatedPosts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
}

export async function deletePostById(req, res) {
    try {
        const postId = req.params.id;
        const response = await deletePostByIdService(postId);
        if(!response){//if no post found with given id
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
}

export async function updatePost(req, res) {
    try {
        const updateObject = req.body;
        if(req.file) {
            updateObject.image = req.file.location;
        }
        const response = await updatePostByIdService(req.params.id, updateObject);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
}