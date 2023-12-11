import {
	Injectable,
	NotFoundException,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { PrismaService } from './../../prisma/prisma.service'

import { Athlete } from '@prisma/client'
import { AthleteDto } from './dto/athlete.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Injectable()
export class AthleteService {
	constructor(private prisma: PrismaService) {}

	async create(dto: AthleteDto): Promise<Athlete> {
		return await this.prisma.athlete.create({ data: dto })
	}

	async getAll(): Promise<Athlete[]> {
		return await this.prisma.athlete.findMany()
	}

	async getById(id: number): Promise<Athlete> {
		const athlete = await this.prisma.athlete.findUnique({ where: { id: +id } })
		if (!athlete) throw new NotFoundException(EXCEPTIONS.NOT_FOUND_EXCEPTION)
		return athlete
	}

	async update(id: number, dto: AthleteDto) {
		await this.getById(id)
		return await this.prisma.athlete.update({ where: { id: +id }, data: dto })
	}

	async delete(id: number) {
		await this.getById(id)

		await this.prisma.athlete.delete({ where: { id: +id } })
	}

	// @UseInterceptors(
	// 	FileInterceptor('avatar', {
	// 		storage: diskStorage({ destination: './uploads/avatars' })
	// 	})
	// )
	// async uploadAvatar(@UploadedFile() file, id: number) {
	// 	await this.prisma.athlete.update({
	// 		where: { id: +id },
	// 		data: { avatar: file.path }
	// 	})
	// }

	// @UseInterceptors(
	// 	FileInterceptor('passport', {
	// 		storage: diskStorage({ destination: './uploads/passports' })
	// 	})
	// )
	// async uploadPassport(@UploadedFile() file, id: number) {
	// 	await this.prisma.athlete.update({
	// 		where: { id: +id },
	// 		data: { passport: file.path }
	// 	})
	// }

	// @UseInterceptors(
	// 	FileInterceptor('certificate', {
	// 		storage: diskStorage({
	// 			destination: './uploads/certificates'
	// 		})
	// 	})
	// )
	// async uploadCertificate(@UploadedFile() file, id: number) {
	// 	await this.prisma.athlete.update({
	// 		where: { id: +id },
	// 		data: { certificate: file.path }
	// 	})
	// }
}
