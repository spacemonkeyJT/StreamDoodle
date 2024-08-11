import { CookieOptions, Express } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { twitchGetCurrentUser } from './twitch';
import log from './log';

const secretKey = process.env.JWT_SECRET ?? crypto.randomBytes(64).toString('hex');

export function registerAuthRoutes(app: Express) {
  // Require valid authentication for API requests.
  app.use('/api/', (req, res, next) => {
    log('auth handler for:', req.path);
    if (req.path.startsWith('/login/')) {
      log('skipping auth check');
      return next();
    }
    const token = req.cookies['token'];
    const access_token = req.cookies['access_token'];
    if (token && access_token) {
      try {
        log('verifying token');
        jwt.verify(token, secretKey);
        log('token valid');
        return next();
      } catch (err) {
        log('invalid token');
        // Invalid token
      }
    }
    log('unauthorized');
    res.status(401).send();
  });

  // Handle login with Twitch callback
  app.post('/api/login/twitch', async (req, res) => {
    try {
      const { access_token } = req.body;
      log({ access_token });
      if (access_token) {
        const twitchUser = await twitchGetCurrentUser(access_token);
        log({ twitchUser });
        const payload = { userId: 123 };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.send({ token });
      } else {
        res.status(401).send();
      }
    } catch (err) {
      log(err);
      res.status(401).send();
    }
  });
}
