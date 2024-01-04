import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Res,
	UploadedFiles,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { Auth } from '@src/auth/decorators/auth.decorator'
import { fileStorage } from '@src/config/storage'
import { Response } from 'express'
import { unlink } from 'fs'
import { join } from 'path'
import { AthleteService } from './athlete.service'
import { AthleteDto } from './dto/athlete.dto'
@ApiTags('Спортсмены')
@ApiBearerAuth()
@Controller('athletes')
export class AthleteController {
	constructor(private readonly athleteService: AthleteService) {}

	@Post('/add')
	@Auth()
	@UsePipes(new ValidationPipe())
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
				rank: { type: 'string' },
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
		if (files.avatar && files.avatar.length > 0) {
			dto.avatar = files.avatar[0].path
		}
		if (files.passport && files.passport.length > 0) {
			dto.passport = files.passport[0].path
		}
		if (files.certificate && files.certificate.length > 0) {
			dto.certificate = files.certificate[0].path
		}
		return this.athleteService.create(dto)
	}
	@Get(':id/images')
	@Auth()
	async getAthleteImages(@Param('id') id: number, @Res() res: Response) {
		const imagePaths = await this.athleteService.getAthleteImages(id)

		res.sendFile(join(process.cwd(), imagePaths.avatar))
		res.sendFile(join(process.cwd(), imagePaths.passport))
		res.sendFile(join(process.cwd(), imagePaths.certificate))
	}
	@Get()
	@Auth()
	async getAll(
		@Query('page') page?: number,
		@Query('limit') limit?: number,
		@Query('region') region?: string,
		@Query('isAdmin') isAdmin?: boolean
	) {
		return this.athleteService.getAll(page, limit, region, isAdmin)
	}

	// @Get()
	// @Auth()
	// async getAll(
	// 	@Query('page') page?: number,
	// 	@Query('limit') limit?: number,
	// 	@Query('region') region?: string,
	// 	@Query('isAdmin') isAdmin?: boolean
	// ) {
	// 	const { data, total } = await this.athleteService.getAll(
	// 		page,
	// 		limit,
	// 		region,
	// 		isAdmin
	// 	)
	// 	return { data, total }
	// }

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: number) {
		return this.athleteService.getById(id)
	}

	@Patch('/edit/:id')
	@Auth()
	@UsePipes(new ValidationPipe())
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
				rank: { type: 'string' },
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
	async update(
		@Param('id') id: number,
		@Body() dto: AthleteDto,
		@UploadedFiles() files
	) {
		const athlete = await this.athleteService.getById(id)

		if (files.avatar && files.avatar.length > 0) {
			if (athlete.avatar) {
				unlink(join(__dirname, '..', athlete.avatar), err => {
					if (err) console.error('Failed to delete old file:' + err)
				})
			}
			dto.avatar = files.avatar[0].path
		}
		if (files.passport && files.passport.length > 0) {
			if (athlete.passport) {
				unlink(join(__dirname, '..', athlete.passport), err => {
					if (err) console.error('Failed to delete old file:' + err)
				})
			}
			dto.passport = files.passport[0].path
		}
		if (files.certificate && files.certificate.length > 0) {
			if (athlete.certificate) {
				unlink(join(__dirname, '..', athlete.certificate), err => {
					if (err) console.error('Failed to delete old file:' + err)
				})
			}
			dto.certificate = files.certificate[0].path
		}

		return this.athleteService.update(id, dto)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: number) {
		await this.athleteService.getById(id)
		await this.athleteService.delete(id)
	}
}
