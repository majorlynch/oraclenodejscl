// routes/authRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

/**
* @swagger
* /auth/token/{userId}/{role}:
*  get:
*     summary:  Generate a signed JWT token
*     tags: [Authentication]
*     description: Returns a signed access token for the given user ID and role. Intended for testing or internal use.
*     parameters:
*       - name: userId
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The user ID to include in the token payload
*       - name: role
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The role to include in the token payload
*     responses:
*       200:
*          content:
*           application/json:
*            schema:
*               type: object
*               properties:
*                 accessToken:
*                   type: string
*                   description: The signed JWT token
*/
router.route('/token/:userId/:role').get((req, res) => {
try {
  console.log('1 process.env.ACCESS_TOKEN_SECRET=' + process.env.ACCESS_TOKEN_SECRET);
  const userId = req.path.userId || 'guest'; // e.g., ?userId=123
  const role = req.path.role || 'user';
  console.log('2');
  
  const token = jwt.sign(
    { userId, role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  console.log('3');
  
  res.json({ accessToken: token });

    }
    catch(err){
        console.error('Error generating token:', err);
        res.status(500).send('Error generating token');
    }
});

export default router;