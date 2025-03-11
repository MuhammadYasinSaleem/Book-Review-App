export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken(); // Generate JWT token

    res.status(statusCode).json({
        success: true,
        message,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        token  // Send token in response
    });
};
