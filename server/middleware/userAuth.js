// Whenever request is made, this middleware will get the token from the cookie
// and from that token it will decode the token and will get the userId and the userId will be added in
// the user body and then the next function will execute our controller function

import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => { // ✅ FIXED: Added 'next' parameter
    try {
        // ✅ FIXED: Get token from cookies, not from request body
        const { token } = req.cookies
        
        console.log('🔍 UserAuth middleware - Token:', token ? 'Present' : 'Missing');

        if (!token) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' })
        }

        // For decoding the token - JWT_SECRET is the secret key to verify and decode the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('🔓 Token decoded, userId:', tokenDecode.id);

        if (tokenDecode.id) {
            // It will add the id in the request body with the property userId
            req.body.userId = tokenDecode.id
            // ✅ FIXED: Now next() is properly defined and called
            next() // This will call our controller function
        } else {
            return res.json({ success: false, message: 'Not Authorized' })
        }

    } catch (error) {
        console.error('❌ UserAuth middleware error:', error.message);
        return res.json({ success: false, message: 'Invalid or expired token' })
    }
}

export default userAuth