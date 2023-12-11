import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		return this.prisma.user.findUnique({ where: { id: +id } })
	}
}
