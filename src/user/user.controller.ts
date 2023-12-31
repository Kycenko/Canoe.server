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
import { UserService } from './user.service'
import { Auth } from '@src/auth/decorators/auth.decorator'
import { UserDto } from './dto/user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Пользователи')
@ApiBearerAuth()
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@Auth('admin')
	async create(@Body() dto: UserDto) {
		return this.userService.create(dto)
	}
	@Get()
	@Auth('admin')
	async getAll() {
		return this.userService.getAll()
	}

	@Get(':id')
	@Auth('admin')
	async getById(@Param('id') id: number) {
		return this.userService.getById(id)
	}

	@Patch(':id')
	@Auth('admin')
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: number, @Body() dto: UserDto) {
		return this.userService.update(id, dto)
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id') id: number) {
		await this.userService.getById(id)
		await this.userService.delete(id)
	}
}
