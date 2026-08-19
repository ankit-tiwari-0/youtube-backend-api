import fs from "fs/promises";
import imagekit from "../config/imagekit.js";
import Video from "../models/video.model.js";

export const upload = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            tags
        } = req.body;

        if (!req.files || !req.files.video || !req.files.thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Video and thumbnail are required"
            });
        }

        // Read video
        const videoBuffer = await fs.readFile(
            req.files.video.tempFilePath
        );

        // Upload video to ImageKit
        const videoUpload = await imagekit.upload({
            file: videoBuffer,
            fileName: req.files.video.name,
            folder: "/videos"
        });

        // Read thumbnail
        const thumbnailBuffer = await fs.readFile(
            req.files.thumbnail.tempFilePath
        );

        // Upload thumbnail to ImageKit
        const thumbnailUpload = await imagekit.upload({
            file: thumbnailBuffer,
            fileName: req.files.thumbnail.name,
            folder: "/thumbnails"
        });

        // Create video document
        const newVideo = new Video({
            title,
            description,

            user_id: req.user.id,

            videoUrl: videoUpload.url,
            videoId: videoUpload.fileId,

            thumbnailUrl: thumbnailUpload.url,
            thumbnailId: thumbnailUpload.fileId,

            category,

            tags: tags
                ? tags.split(",").map(tag => tag.trim())
                : []
        });

        await newVideo.save();

        return res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            video: newVideo
        });

    } catch (error) {
        console.error("Upload Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const update = async (req, res) => {
    res.send("ok")
}