import post from '../schema/post.js';

export const createPost = async (caption, image, userId) => {
    try {
        // const newPost = await post.create({ caption, image, userId });
        const newPost = new post({ caption, image, userId });
        await newPost.save();
        return newPost;
    } catch (error) {
        throw new Error('Error creating post');
    }
}

export const findPostById = async (postId) => {
    try {
        const post = await post.findById(postId);
        return post;
    } catch (error) {
        throw new Error('Error finding post by ID');
    }
}

export const findAllPosts = async () => {
    try {
        const posts = await post.find({});
        return posts;
    } catch (error) {
        throw new Error('Error finding all posts');
    }
}

export const deletePostById = async (postId) => {
    try {
        await post.findByIdAndDelete(postId);
    } catch (error) {
        throw new Error('Error deleting post by ID');
    }
}
