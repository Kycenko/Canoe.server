import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

import { Auth } from './decorators/auth.decorator'
import { RegisterDto } from './dto/register.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Регистрация/Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return this.authService.register(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto.refreshToken)
	}
}
