import 'dotenv/config';

import * as jwt from 'jsonwebtoken';
import { EJWTErrors, IJwtData } from './types';

const secretKey = process.env.JWT_SECRET_KEY;

const sign = (data: IJwtData): string | EJWTErrors => {
    if (!secretKey) return EJWTErrors.SECRET_NOT_FOUND;

    return jwt.sign(data, secretKey, { expiresIn: '24h' });
};

const verify = (token: string): IJwtData | EJWTErrors => {
    if (!secretKey) return EJWTErrors.SECRET_NOT_FOUND;

    try {
        const decoded = jwt.verify(token, secretKey);
        if (typeof decoded === 'string') {
            return EJWTErrors.INVALID_TOKEN;
        }
        return decoded as IJwtData;
    } catch (error) {
        return EJWTErrors.INVALID_TOKEN;
    }
};

export const JWTService = {
    sign,
    verify
};
