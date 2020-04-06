/**
 *  Author:         Tam Nhan
 *  Course:         CST8334 - Software Development Project
 *  File:           auth.ts
 *  Summary:        Implements authentication/authorization behaviour using Okta
 */

import { Request, Response, NextFunction} from 'express';

const OktaJwtVerifier = require('@okta/jwt-verifier');
const config = require('config');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: config.get('okta.issuer'),
  clientId: config.get('okta.clientId')
});

export async function oktaAuth(req:Request, res:Response, next:NextFunction) {
    try {
      const token = (req as any).token;
      if (!token) {
        return res.status(401).send('Not Authorized');
      }
      const jwt = await oktaJwtVerifier.verifyAccessToken(token);
      req.body.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      };
      next();
    }
    catch (err) {
      return res.status(401).send(err.message);
    }
  }
