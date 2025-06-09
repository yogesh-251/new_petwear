import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

const SUPABASE_JWT_AUDIENCE = 'authenticated'; // default Supabase audience
const SUPABASE_JWT_ISSUER = 'https://pdpjqcmlwybyjzpvhpew.supabase.co/auth/v1';

const client = jwksClient({
  jwksUri: `${SUPABASE_JWT_ISSUER}/.well-known/jwks.json`,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key: any) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>() as Request & { user?: any };
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded: any = await new Promise((resolve, reject) => {
        jwt.verify(
          token,
          getKey,
          {
            audience: SUPABASE_JWT_AUDIENCE,
            issuer: SUPABASE_JWT_ISSUER,
            algorithms: ['RS256'],
          },
          (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
          },
        );
      });

      req.user = decoded;
      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
