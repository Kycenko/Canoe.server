import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { TypeRole } from '../auth.interface'
import { JWTAuthGuard } from '@src/guards/jwt.guard'
import { AdminGuard } from '@src/guards/admin.guard'

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(JWTAuthGuard, AdminGuard)
			: UseGuards(JWTAuthGuard)
	)
