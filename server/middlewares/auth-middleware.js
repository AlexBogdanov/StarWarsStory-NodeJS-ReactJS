const authMiddleware = {
    isAdmin: (req, res, next) => {
        if (req.user.roles.includes('Admin')) {
            next();
        }
    }
};

module.exports = authMiddleware;
