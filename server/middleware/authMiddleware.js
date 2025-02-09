import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'someKey';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: '[UNAUTHORIZED] - No token provided'
        });
    }

    try {
        const decodedToken = jwt.verify(token, secret);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({
            error: '[UNAUTHORIZED] - Invalid token.'
        })
    }
}

export default authMiddleware;