"use strict";
/**
 *  Author:         Tam Nhan
 *  Course:         CST8334 - Software Development Project
 *  File:           auth.ts
 *  Summary:        Implements authentication/authorization behaviour using Okta
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-810851.okta.com/oauth2/default',
    clientId: '0oa1a9g8grSMSPfQp4x6'
});
function oktaAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.token;
            if (!token) {
                return res.status(401).send('Not Authorized');
            }
            const jwt = yield oktaJwtVerifier.verifyAccessToken(token);
            req.body.user = {
                uid: jwt.claims.uid,
                email: jwt.claims.sub
            };
            next();
        }
        catch (err) {
            return res.status(401).send(err.message);
        }
    });
}
exports.oktaAuth = oktaAuth;
