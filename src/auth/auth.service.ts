import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { PrismaService } from '@prisma/prisma.service'
import { hash, verify } from 'argon2'
import { AuthDto } from './dto/auth.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnFields(user),
			...tokens
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: { login: dto.login }
		})

		if (!user) throw new NotFoundException(EXCEPTIONS.NOT_FOUND_EXCEPTION)

		const isValid = await verify(user.password, dto.password)

		if (!isValid)
			throw new UnauthorizedException(EXCEPTIONS.INVALID_PASSWORD_EXCEPTION)
		return user
	}

	async register(dto: RegisterDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: { login: dto.login }
		})

		if (oldUser)
			throw new BadRequestException(EXCEPTIONS.USER_ALREADY_EXISTS_EXCEPTION)

		const user = await this.prisma.user.create({
			data: {
				login: dto.login,
				password: await hash(dto.password),
				isAdmin: dto.isAdmin,
				region: dto.region
			}
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnFields(user),
			...tokens
		}
	}

	private async issueTokens(id: number) {
		const data = { id: id }

		const accessToken = await this.jwt.signAsync(data, { expiresIn: '1h' })
		const refreshToken = await this.jwt.signAsync(data, { expiresIn: '7d' })

		return { accessToken, refreshToken }
	}

	private returnFields(user: Partial<User>) {
		return {
			id: user.id,
			login: user.login,
			isAdmin: user.isAdmin,
			region: user.region
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result)
			throw new UnauthorizedException(EXCEPTIONS.INVALID_TOKEN_EXCEPTION)

		const user = await this.prisma.user.findUnique({ where: { id: result.id } })

		const tokens = await this.issueTokens(user.id)
		return {
			user: this.returnFields(user),
			...tokens
		}
	}
}
