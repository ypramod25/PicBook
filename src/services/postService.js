import {countAllPosts, createPost, deletePostById, findAllPosts, updatePostById} from '../repositories/postRepo.js'

export const createPostService = async (createPostObject) => {
    //1. Take the image of post and upload on aws s3 or cloudinary
    //2. Get the image url from aws s3 after successful upload
    //3. Create a post with the caption and the image url in db using postRepo
    //4. Return the post object
    const caption = createPostObject.caption;
    const imageUrl = createPostObject.imageUrl;

    const newPost = await createPost(caption, imageUrl, createPostObject.userId);
    return newPost;

}

export const getAllPostsService = async (offset = 0, limit = 10) => {
    // Fetch all posts from db using postRepo
    const posts = await findAllPosts(offset, limit);
    const totalDocuments = await countAllPosts();
    const totalPages = Math.ceil(totalDocuments / limit);

    return {posts, totalPages, totalDocuments} ;
}

export const deletePostByIdService = async (postId) => {
    // Delete the post from db using postRepo
    const response = await deletePostById(postId);
    return response;
}

export const updatePostByIdService = async (postId, updateObject) => {
    // Update the post in db using postRepo
    const updatedPost = await updatePostById(postId, updateObject);
    return updatedPost;
}