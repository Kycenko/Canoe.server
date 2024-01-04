import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from './../../prisma/prisma.service'

import { Athlete } from '@prisma/client'
import { AthleteDto } from './dto/athlete.dto'

@Injectable()
export class AthleteService {
	constructor(private prisma: PrismaService) {}

	async create(dto: AthleteDto): Promise<Athlete> {
		return await this.prisma.athlete.create({ data: dto })
	}

	async getAll(
		page?: number,
		limit?: number,
		region?: string,
		isAdmin?: boolean
	): Promise<Athlete[]> {
		let skip = page && page > 1 ? (page - 1) * limit : 0
		if (isAdmin) {
			return await this.prisma.athlete.findMany({
				skip: skip,
				take: +limit
			})
		} else if (page && limit) {
			return await this.prisma.athlete.findMany({
				where: {
					region: region
				},
				skip: skip,
				take: +limit
			})
		} else {
			return await this.prisma.athlete.findMany({
				where: {
					region: region
				}
			})
		}
	}
	// async getAll(
	// 	page?: number,
	// 	limit?: number,
	// 	region?: string,
	// 	isAdmin?: boolean
	// ): Promise<{ data: Athlete[]; total: number }> {
	// 	let athletes
	// 	let total

	// 	if (isAdmin) {
	// 		athletes = await this.prisma.athlete.findMany({
	// 			skip: (page - 1) * limit,
	// 			take: +limit
	// 		})
	// 		total = await this.prisma.athlete.count()
	// 	} else if (page && limit) {
	// 		athletes = await this.prisma.athlete.findMany({
	// 			where: {
	// 				region: region
	// 			},
	// 			skip: (page - 1) * limit,
	// 			take: +limit
	// 		})
	// 		total = await this.prisma.athlete.count()
	// 	} else {
	// 		athletes = await this.prisma.athlete.findMany({
	// 			where: {
	// 				region: region
	// 			}
	// 		})
	// 		total = await this.prisma.athlete.count({
	// 			where: {
	// 				region: region
	// 			}
	// 		})
	// 	}

	// 	return { data: athletes, total: total }
	// }

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

	async getAthleteImages(
		id: number
	): Promise<{ avatar: string; passport: string; certificate: string }> {
		const athlete = await this.prisma.athlete.findUnique({ where: { id: +id } })
		if (!athlete) throw new NotFoundException(EXCEPTIONS.NOT_FOUND_EXCEPTION)

		return {
			avatar: athlete.avatar,
			passport: athlete.passport,
			certificate: athlete.certificate
		}
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
