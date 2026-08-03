

export const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user //user is coming from isAuth middleware
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}