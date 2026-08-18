import bcrypt from "bcrypt";
import express from "express";
import mongoose from "mongoose";
import imagekit from "../config/imagekit.js";
import User from "../models/user.model.js";
import fs from "fs/promises";


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

export const login = async(req, res) =>{
    res.send("ok")
}