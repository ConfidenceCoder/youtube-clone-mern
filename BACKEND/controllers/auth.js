import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { wrapAsync } from '../utils/wrapAsync.js';

const cookieOptions = {
    httpOnly: true,
    secure: true,      
    sameSite: "none",  
};

export const signup = wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: "Email is already registered! please sign in." })
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username: username,
        email: email,
        password: hashpassword
    })

    await newUser.save();
    res.status(201).json({ message: "user created successfully!" });
})

export const signin = wrapAsync(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        return res.status(404).json({ message: "user not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "wrong password" });
    }
    
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    const { password: userPassword, ...others } = existingUser._doc;

    res.cookie("access_token", token, cookieOptions).status(200).json(others);
})

export const googleAuth = wrapAsync(async (req, res) => {
    const { name, email, img } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        if (!existingUser.img) {
            existingUser.img = img; 
            await existingUser.save();
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
        const { password, ...others } = existingUser._doc;

        res.cookie("access_token", token, cookieOptions).status(200).json(others);
    } else {
        const defaultImg = img 
        ? img 
        : `https://ui-avatars.com/api/?name=${name || "User"}&background=random&color=fff&size=128`;
        
        const newUser = new User({
            username: name,
            email: email,
            img: defaultImg,
            fromGoogle: true,
        })

        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
        const { password, ...others } = savedUser._doc;

        res.cookie("access_token", token, cookieOptions).status(200).json(others);
    }
})

export const logout = (req, res) => {
    res.clearCookie("access_token", cookieOptions).status(200).json("Logged out successfully");
};