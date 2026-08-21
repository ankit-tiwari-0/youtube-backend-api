import Comment from "../models/comment.model.js";
export const addComment = async (req, res) => {
    try {
        const { video_id, commentText } = req.body;

        if (!video_id || !commentText) {
            return res.status(400).json({
                success: false,
                message: "Video ID and Comment Text are required"
            });
        }

        const newComment = new Comment({
            video_id,
            commentText,
            user_id: req.user.id
        });

        await newComment.save();

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (error) {
        console.error("Error adding comment:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


