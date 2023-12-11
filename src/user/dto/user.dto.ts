import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator'

export class UserDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	login: string
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	password: string
	@ApiProperty()
	@IsBoolean()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	isAdmin: boolean
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	region: string
	@ApiProperty()
	@IsDate()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	createdAt: Date
	@ApiProperty()
	@IsDate()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	updatedAt: Date
}
