require('../config/firebase.config');
const express = require('express');
const { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {

        const { email, password } = req.body;

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                res.status(201).json({
                    message: 'User registered successful',
                    data: user
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                res.status(400).json({
                    message: 'Cant signin. Please try again later',
                    message: errorMessage,
                    code: errorCode
                });
            });
    } catch (error) {
        res.status(500).json({
            message: 'User registration query failed.',
            error: error
        })    
    }
});

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.status(201).json({
                message: 'User login successful',
                data: user
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(400).json({
                message: 'Cant login. Please try again later',
                message: errorMessage,
                code: errorCode
            });
        });

    } catch (error) {
        res.status(500).json({
            message: 'User login query failed.',
            error: error
        })    
    }
});

router.post('/logout', async (req, res) => {
    try {

        const auth = getAuth();
        signOut(auth).then(() => {
            res.status(200).json({
                message: 'User logout query failed.',
            });
        }).catch((error) => {
            res.status(500).json({
                message: 'User logout query failed.',
                error: error
            });  
        });

    } catch (error) {
        res.status(500).json({
            message: 'User login query failed.',
            error: error
        })    
    }
});

module.exports = router;