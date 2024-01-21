const jwt=require("jsonwebtoken")
function verifyAccessToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    req.user = decoded;
    next();
  });
}

module.exports= { verifyAccessToken };
