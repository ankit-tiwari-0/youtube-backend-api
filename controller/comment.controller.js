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


// 🔹 Delete Comment
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        // Only comment owner can delete
        if (
            comment.user_id.toString() !==
            req.user.id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this comment"
            });
        }

        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting comment:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

