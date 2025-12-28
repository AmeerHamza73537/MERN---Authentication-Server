// Whenever request is made, this middleware will get the token from the cookie
// and from that token it will decode the token and will get the userId and the userId will be added in
// the user body and then the next function will execute our controller function

import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => { // ✅ FIXED: Added 'next' parameter
    try {
        // Get token from cookie, Authorization header (Bearer), or request body as fallback
        const tokenFromCookie = req.cookies ? req.cookies.token : null
        const authHeader = req.headers ? req.headers.authorization : null
        const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
        const tokenFromBody = req.body ? req.body.token : null

        const token = tokenFromCookie || tokenFromHeader || tokenFromBody

        console.log('🔍 UserAuth middleware - token sources:', {
            cookie: tokenFromCookie ? 'present' : 'missing',
            header: tokenFromHeader ? 'present' : 'missing',
            body: tokenFromBody ? 'present' : 'missing'
        })

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
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