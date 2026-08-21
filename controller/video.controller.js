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
    try {
        const { title, description, category, tags } = req.body;
        const videoId = req.params.id;

        // Find video
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        // Only owner can update
        if (video.user_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Update thumbnail if provided
        if (req.files?.thumbnail) {

            // Delete old thumbnail from ImageKit
            if (video.thumbnailId) {
                await imagekit.deleteFile(video.thumbnailId);
            }

            // Read new thumbnail
            const thumbnailBuffer = await fs.readFile(
                req.files.thumbnail.tempFilePath
            );

            // Upload new thumbnail
            const thumbnailUpload = await imagekit.upload({
                file: thumbnailBuffer,
                fileName: req.files.thumbnail.name,
                folder: "/thumbnails"
            });

            video.thumbnailUrl = thumbnailUpload.url;
            video.thumbnailId = thumbnailUpload.fileId;
        }

        // Update text fields
        if (title) {
            video.title = title;
        }

        if (description) {
            video.description = description;
        }

        if (category) {
            video.category = category;
        }

        if (tags) {
            video.tags = tags
                .split(",")
                .map(tag => tag.trim());
        }

        await video.save();

        return res.status(200).json({
            success: true,
            message: "Video updated successfully",
            video
        });

    } catch (error) {
        console.error("Update Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id;

        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        // Only owner can delete
        if (video.user_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Delete video from ImageKit
        if (video.videoId) {
            await imagekit.deleteFile(video.videoId);
        }

        // Delete thumbnail from ImageKit
        if (video.thumbnailId) {
            await imagekit.deleteFile(video.thumbnailId);
        }

        // Delete from MongoDB
        await Video.findByIdAndDelete(videoId);

        return res.status(200).json({
            success: true,
            message: "Video deleted successfully"
        });
         } catch (error) {
        console.error("Delete Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            videos
        });

    } catch (error) {
        console.error("Fetch Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyVideos = async (req, res) => {
    try {
        const videos = await Video.find({
            user_id: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            videos
        });

    } catch (error) {
        console.error("Fetch Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const getVideoById = async (req, res) => {
    try {
        const videoId = req.params.id;
        const userId = req.user.id;

        const video = await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet: {
                    viewedBy: userId
                }
            },
            {
                new: true
            }
        );

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        return res.status(200).json({
            success: true,
            video
        });

    } catch (error) {
        console.error("Fetch Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getVideosByCategory = async (req, res) => {
    try {
        const videos = await Video.find({
            category: req.params.category
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            videos
        });

    } catch (error) {
        console.error("Fetch Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getVideosByTag = async (req, res) => {
    try {
        const tag = req.params.tag;

        const videos = await Video.find({
            tags: tag
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            videos
        });

    } catch (error) {
        console.error("Fetch Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const likeVideo = async (req, res) => {
    try {
        const { videoId } = req.body;
        const userId = req.user.id;

        const video = await Video.findByIdAndUpdate(
            videoId,
            {
                $addToSet: {
                    likes: userId
                },
                $pull: {
                    dislikes: userId
                }
            },
            {
                new: true
            }
        );

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Liked the video"
        });

    } catch (error) {
        console.error("Like Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
