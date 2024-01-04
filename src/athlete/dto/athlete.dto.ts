import { IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AthleteDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	name: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	surname: string

	@ApiProperty()
	@IsString()
	secondName: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	birthDate: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	region: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	rank: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	type: string

	@ApiProperty()
	@IsOptional()
	avatar: string

	@ApiProperty()
	@IsOptional()
	passport: string

	@ApiProperty()
	@IsOptional()
	certificate: string
}
