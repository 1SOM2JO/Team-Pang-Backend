import { validateTokenData, createTokens } from '../../../src/auth/authUtils';
import { JwtPayload } from '../../../src/core/JWT';
import { tokenInfo } from '../../../src/config';
import { AuthFailureError } from '../../../src/core/ApiError';
import { User } from '../../../src/database/model/User';

const user = {
  uuid: 1,
  permission: 'SELLER',
  id: 'test',
  nickname: 'test',
  password: 'test',
  phonenumber: 'test',
  accessTokenKey: 'test',
  refreshTokenKey: 'test',
} as User;

describe('authUtils validateTokenData tests', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('validateTokenData tests', async () => {
    const payload = new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      '1',
      '1234',
      tokenInfo.accessTokenValidityDays,
    );

    try {
      validateTokenData(payload);
    } catch (e) {
      expect(e).toBeInstanceOf(AuthFailureError);
    }
  });
});

describe('authUtils createTokens function', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('Should process and return accessToken and refreshToken', async () => {
    const tokens = await createTokens(user, '1234', '1234');

    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
  });
});
