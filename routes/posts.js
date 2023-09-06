require('../config/firebase.config');
require('../config/firebase.admin.sdk');
const express = require('express');
const Post = require('../models/Post');
const { getStorage, ref, uploadBytes, listAll, getDownloadURL } = require('firebase/storage');
const { upload } = require('../middlewares/multer');

const router = express.Router();

const storage = getStorage();

router.post('/', upload.single('image'), async (req, res) => {
    try {
        console.log(req.file); 

        const { title, author } = req.body;
        const imageFile = req.file; // Assuming you're using a middleware like multer to handle file uploads

        // Ensure that the image file exists
        if (!imageFile) {
            return res.status(400).json({
                message: 'Image file is required',
            });
        }

        const storageRef = ref(storage, `posts/${imageFile.originalname}`);
        await uploadBytes(storageRef, imageFile.buffer);

        // Create a new post with the image URL
        const imageUrl = `https://storage.googleapis.com/${storage.bucket}/${storageRef.fullPath}`;
        const newPost = new Post({
            title,
            author,
            image: imageUrl,
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            message: 'Post created query successul',
            firebase: 'Image upload successful',
            data: savedPost
        });

    } catch (error) {
        res.status(500).json({
            message: 'Post created query failed',
            error: error
        })    
    }
});

router.get('/getImages', async (req, res) => {
    try {

        const listRef = ref(storage, 'posts/');

        const listResult = await listAll(listRef);

        const imageUrls = [];

        for (const item of listResult.items) {
            const imageUrl = await getDownloadURL(item);
            imageUrls.push(imageUrl);
        }

        res.status(200).json({
            message: 'Get files query successful',
            data: imageUrls,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Get files query failed',
            error: error.message
        })    
    }
});

module.exports = router; 