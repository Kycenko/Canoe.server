import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CompetitionService } from './competition.service'
import { Auth } from '@src/auth/decorators/auth.decorator'
import { CompetitionDto } from './dto/competition.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Соревнования')
@ApiBearerAuth()
@Controller('competitions')
export class CompetitionController {
	constructor(private readonly competitionService: CompetitionService) {}

	@Post('/create-competition')
	@Auth()
	async create(@Body() dto: CompetitionDto) {
		return this.competitionService.create(dto)
	}

	@Get()
	@Auth()
	async getAll() {
		return this.competitionService.getAll()
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: number) {
		return this.competitionService.getById(id)
	}

	@Patch('/update-competition/:id')
	@Auth()
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: CompetitionDto) {
		return this.competitionService.update(id, dto)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: number) {
		await this.competitionService.getById(id)
		await this.competitionService.delete(id)
	}
}
