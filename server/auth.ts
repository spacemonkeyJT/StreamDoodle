import { CookieOptions, Express } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { DEV } from './constants';

const secretKey = crypto.randomBytes(64).toString('hex');

export function registerAuthRoutes(app: Express) {
  // Require valid authentication for API requests.
  app.use('/api/', (req, res, next) => {
    const token = req.cookies['token'];
    const access_token = req.cookies['token'];
    if (token && access_token) {
      try {
        jwt.verify(token, secretKey);
        return next();
      } catch (err) {
        // Invalid token
      }
    }
    res.status(401).send();
  });

  // Handle login with Twitch callback
  app.get('/api/login/twitch', (req, res) => {
    const { code } = req.query;
    if (code) {
      const payload = { userId: 123 };
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: !DEV,
        maxAge: 3600000 // 1 hour
      });
      res.cookie('access_token', code, {
        secure: !DEV,
      });
    }
    res.redirect('/');
  });
}
