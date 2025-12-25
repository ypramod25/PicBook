import {createPost} from '../repositories/postRepo.js'

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