import bcrypt from "bcrypt";
import express from "express";
import mongoose from "mongoose";
import imagekit from "../config/imagekit.js";
import User from "../models/user.model.js";
import fs from "fs/promises";
import jwt from "jsonwebtoken";



export const signup = async (req, res) => {
    try {
        const hashcode = await bcrypt.hash(req.body.password, 10);
        const fileBuffer = await fs.readFile(
            req.files.logo.tempFilePath
        );

        const uploadImage = await imagekit.upload({
            file: fileBuffer,
            fileName: req.files.logo.name
        });
        const newUser = new User({
            email: req.body.email,
            password: hashcode,
            channelName: req.body.channelName,
            phone: req.body.phone,
            logoUrl: uploadImage.url,
            logoId: uploadImage.fileId
        });

        const user = await newUser.save();

        res.status(201).json({
            success: true,
            user
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const isValid = await bcrypt.compare(
            req.body.password,
            existingUser.password
        )

        if (!isValid) {
            return res.status(500).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            {
                id: existingUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
       
        res.status(200).json({
            success:true,
            message:"LOGIN Successfully"
         })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}