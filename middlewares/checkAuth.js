const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        let { email, userId } = decoded;

        let newToken = jwt.sign(
            {
                email,
                userId
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        req.newToken = newToken;

        next();
    } catch (error) {
        console.log('error: ', error);
        return res.status(401).json({ message: 'Authentication failed.' });
    }
};
