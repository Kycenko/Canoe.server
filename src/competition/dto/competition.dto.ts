import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class CompetitionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	name: string
	@ApiProperty()
	@IsDate()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	startDate: Date
	@ApiProperty()
	@IsDate()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	finishDate: Date
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	place: string
}
