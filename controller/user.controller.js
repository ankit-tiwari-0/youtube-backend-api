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
            message:"LOGIN Successfully",
            token:token
         })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { channelName, phone } = req.body;

        const updatedData = {};

        if (channelName) {
            updatedData.channelName = channelName;
        }

        if (phone) {
            updatedData.phone = phone;
        }

        // Handle profile picture update
        if (req.files?.logo) {

            // Delete old logo from ImageKit
            const existingUser = await User.findById(req.user.id);

            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            if (existingUser.logoId) {
                await imagekit.deleteFile(existingUser.logoId);
            }

            // Read new logo
            const fileBuffer = await fs.readFile(
                req.files.logo.tempFilePath
            );

            // Upload new logo
            const uploadedImage = await imagekit.upload({
                file: fileBuffer,
                fileName: req.files.logo.name,
                folder: "/logos"
            });
             updatedData.logoUrl = uploadedImage.url;
            updatedData.logoId = uploadedImage.fileId;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updatedData,
            {
                new: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
