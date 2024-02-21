import User from "../models/userModel.js";
import md5 from "md5";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateTokenAndPersonalKey = async (user) => {
    try {
        const payload = {
            id: user._id,
            username: user.username
        };
        const salt = await bcrypt.genSalt(6);
        const secretKey = process.env.JWT_SECRET + salt;
        const token = jwt.sign(payload, secretKey, { expiresIn: process.env.TOKEN_LIFE });
        return {token: token, personalKey: salt}; //return token and "salt" to use as user personalkey
    } catch (error) {
        throw new Error('Token generation failed');
    }
};

export const registerController = async (req, res) => {
    req.body.password = md5(req.body.password);

    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const foundUser = await User.findOne({ username: req.body.username, password: req.body.password });
        if (foundUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newTokenAndKey = await generateTokenAndPersonalKey(newUser);
        const token = newTokenAndKey.token;
        const personalKey = newTokenAndKey.personalKey;
        newUser.personalKey = personalKey;
        await newUser.save();
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const loginController = async (req, res) => {
    req.body.password = md5(req.body.password);

    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const newTokenAndKey = await generateTokenAndPersonalKey(user);
        const token = newTokenAndKey.token;
        const personalKey = newTokenAndKey.personalKey;
        user.personalKey = personalKey;
        await user.save();
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const logoutController = async (req, res) => {
    req.body.password = md5(req.body.password);

    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        //setting personalKey to default value, to invalidate the token
        user.personalKey = "-";
        await user.save();
        res.status(200).json({ message: 'You have been logged out successfully' })
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

export const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Authentication token is required" });
    }

    try {
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
            return res.status(403).json({ error: "Redirect to login" });
        }

        const user = await User.findById(decodedToken.payload.id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const secretKey = process.env.JWT_SECRET + user.personalKey;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Redirect to login" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: "Redirect to login" });
    }
};


