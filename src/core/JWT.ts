import { promisify } from 'util';
import { sign, verify } from 'jsonwebtoken';
import { InternalError, BadTokenError, TokenExpiredError } from './apiError';
import Logger from './Logger';
import { tokenInfo } from '../config';

export default class JWT {
  public static async encode(payload: JwtPayload): Promise<string> {
    const cert = tokenInfo.key;
    if (!cert) throw new InternalError('Token generation failure');
    // @ts-ignore
    return promisify(sign)({ ...payload }, cert);
  }

  public static async validate(token: string): Promise<JwtPayload> {
    const cert = tokenInfo.key;
    try {
      // @ts-ignore
      return (await promisify(verify)(token, cert)) as JwtPayload;
    } catch (e) {
      Logger.debug(e);
      if (e && e.name === 'TokenExpiredError') throw new TokenExpiredError();

      throw new BadTokenError();
    }
  }

  public static async decode(token: string): Promise<JwtPayload> {
    const cert = tokenInfo.key;
    try {
      // @ts-ignore
      return (await promisify(verify)(token, cert, {
        ignoreExpiration: true,
      })) as JwtPayload;
    } catch (e) {
      Logger.debug(e);
      throw new BadTokenError();
    }
  }
}

export class JwtPayload {
  aud: string;
  sub: number;
  iss: string;
  iat: number;
  exp: number;
  prm: string;

  constructor(
    issuer: string,
    audience: string,
    subject: number,
    param: string,
    validity: number,
  ) {
    this.iss = issuer;
    this.aud = audience;
    this.sub = subject;    
    this.iat = Math.floor(Date.now() / 1000);
    this.exp = this.iat + validity * 60 * 60;
    this.prm = param;
  }
}
