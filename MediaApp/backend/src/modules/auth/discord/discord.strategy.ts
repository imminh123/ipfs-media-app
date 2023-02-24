import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { encrypt } from 'src/utils/encrypt';
import { AuthService } from '../auth.service';

export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.DISCORD_APP_ID,
      clientSecret: process.env.DISCORD_APP_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    const encryptedAccessToken = encrypt(accessToken).toString();
    const encryptedRefreshToken = encrypt(refreshToken).toString();
    const { id: discordId, email, discriminator, username, avatar } = profile;
    const user = await this.authService.validateUser({
      userId: discordId,
      email,
      discriminator: `${username}#${discriminator}`,
      avatar,
    });

    done(null, user);
  }
}
