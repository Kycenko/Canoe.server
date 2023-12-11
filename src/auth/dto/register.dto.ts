import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	isString
} from 'class-validator'
import { IsEqualTo } from '@utils/constraints/isEqualsTo'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	@MinLength(4)
	@MaxLength(15)
	login: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	@MinLength(6, { message: 'Минимум 6 символов!' })
	@MaxLength(20, { message: 'Максимум 20 символов!' })
	password: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	@IsEqualTo('password', { message: 'Пароли должны совпадать!' })
	confirmPassword: string

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	isAdmin: boolean

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	region: string
}
