const formidable = require('formidable');
const cookie = require('cookie-parser');
const fs = require('fs');
const validator = require('validator');

const registerModel = require('../models/authModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports.userRegister = (req, res) => {
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
        const { userName, email, password, confirmPassword } = fields;
        const { image } = files;
        const error = [];
        if (!userName) {
            error.push('Please provide your username');
        }
        if (!email) {
            error.push('Please provide your Email');
        }
        if (email && !validator.isEmail(email)) {
            error.push('Please provide your Valid Email');
        }
        if (!password) {
            error.push('Please provide your Password');
        }
        if (!confirmPassword) {
            error.push('Please provide your confirm Password');
        }
        if (password && confirmPassword && password !== confirmPassword) {
            error.push('Your Password and Confirm Password not same');
        }
        if (password && password.length < 6) {
            error.push('Please provide password mush be 6 charecter');
        }
        if (Object.keys(files).length === 0) {
            error.push('Please provide user image');
        }

        // If have err retturn err
        if (error.length > 0) {
            res.status(400).json({
                error: {
                    errorMessage: error,
                },
            });
        } else {
            const getImageName = image.originalFilename;
            const randNumber = Math.floor(Math.random() * 99999);
            const newImageName = randNumber + getImageName;
            image.originalFilename = newImageName;
            const newPath =
                __dirname +
                `../../../frontend/public/image/${image.originalFilename}`;

            try {
                const checkUser = await registerModel.findOne({ email: email });
                if (checkUser) {
                    res.status(404).json({
                        error: {
                            errorMessage: ['User is already exited'],
                        },
                    });
                } else {
                    fs.copyFile(image.filepath, newPath, async (err) => {
                        if (!err) {
                            const createUser = await registerModel.create({
                                email,
                                userName,
                                password: await bcrypt.hash(password, 12),
                                image: image.originalFilename,
                            });

                            // tao duoc nguoi dung roi thi tao token
                            const token = jwt.sign(
                                {
                                    id: createUser._id,
                                    userName: createUser.userName,
                                    email: createUser.email,
                                    image: createUser.image,
                                    registerTime: createUser.createdAt,
                                },
                                process.env.SECRET,
                                { expiresIn: process.env.TOKEN_EXP }
                            );

                            //    setcookie
                            const options = {
                                expires: new Date(
                                    Date.now() +
                                        process.env.COOKIE_EXP *
                                            24 *
                                            60 *
                                            60 *
                                            1000
                                ),
                            };
                            res.status(201)
                                .cookie('authToken', token, options)
                                .json({
                                    message: 'Register success!',
                                    token,
                                });
                        } else {
                            res.status(500).json({
                                error: {
                                    errorMessage: [
                                        'Internal Server Error (read file)',
                                    ],
                                },
                            });
                        }
                    });
                }
            } catch (error) {
                res.status(500).json({
                    error: {
                        errorMessage: ['Internal Server Error!!'],
                    },
                });
            }
        }
    });
};

module.exports.userLogin = async (req, res) => {
    const error = [];
    const { email, password } = req.body;
    if (!email) {
        error.push('Please provide your Email');
    }
    if (!password) {
        error.push('Please provide your Passowrd');
    }
    if (email && !validator.isEmail(email)) {
        error.push('Please provide your Valid Email');
    }

    // IF have Error return errr
    if (error.length > 0) {
        res.status(400).json({
            error: {
                errorMessage: error,
            },
        });
    } else {
        try {
            const checkUser = await registerModel
                .findOne({
                    email: email,
                })
                .select('+password');

            if (checkUser) {
                const matchPassword = await bcrypt.compare(
                    password,
                    checkUser.password
                );

                if (matchPassword) {
                    const token = jwt.sign(
                        {
                            id: checkUser._id,
                            email: checkUser.email,
                            userName: checkUser.userName,
                            image: checkUser.image,
                            registerTime: checkUser.createdAt,
                        },
                        process.env.SECRET,
                        {
                            expiresIn: process.env.TOKEN_EXP,
                        }
                    );
                    const options = {
                        expires: new Date(
                            Date.now() +
                                process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                        ),
                    };

                    res.status(200).cookie('authToken', token, options).json({
                        message: 'Your Login Successful',
                        token,
                    });
                } else {
                    res.status(400).json({
                        error: {
                            errorMessage: ['Your Password not Valid'],
                        },
                    });
                }
            } else {
                res.status(400).json({
                    error: {
                        errorMessage: ['Your Email Not Found'],
                    },
                });
            }
        } catch {
            res.status(404).json({
                error: {
                    errorMessage: ['Internal Sever Error'],
                },
            });
        }
    }
};

module.exports.userLogout = (req, res) => {
    res.status(200).cookie('authToken', '').json({
        success: true,
    });
};
