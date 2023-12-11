import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UploadedFiles,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AthleteService } from './athlete.service'
import { Auth } from '@src/auth/decorators/auth.decorator'
import { AthleteDto } from './dto/athlete.dto'
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { fileStorage } from '@src/config/storage'

@ApiTags('Спортсмены')
@ApiBearerAuth()
@Controller('athletes')
export class AthleteController {
	constructor(private readonly athleteService: AthleteService) {}

	@Post('/create-athlete')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				avatar: { type: 'string', format: 'binary' },
				passport: { type: 'string', format: 'binary' },
				certificate: { type: 'string', format: 'binary' },
				name: { type: 'string' },
				surname: { type: 'string' },
				secondName: { type: 'string' },
				birthDate: { type: 'string', format: 'date-time' },
				region: { type: 'string' },
				type: { type: 'string' }
			}
		}
	})
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{ name: 'avatar', maxCount: 1 },
				{ name: 'passport', maxCount: 1 },
				{ name: 'certificate', maxCount: 1 }
			],
			{
				storage: fileStorage('./uploads')
			}
		)
	)
	create(@Body() dto: AthleteDto, @UploadedFiles() files) {
		return this.athleteService.create(dto)
	}

	@Get()
	@Auth()
	async getAll() {
		return this.athleteService.getAll()
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: number) {
		return this.athleteService.getById(id)
	}

	@Patch('/update-athlete/:id')
	@Auth()
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: AthleteDto) {
		return this.athleteService.update(id, dto)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: number) {
		await this.athleteService.getById(id)
		await this.athleteService.delete(id)
	}
}
