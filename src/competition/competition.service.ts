import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { CompetitionDto } from './dto/competition.dto'
import { Competition } from '@prisma/client'

@Injectable()
export class CompetitionService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CompetitionDto): Promise<Competition> {
		return await this.prisma.competition.create({ data: dto })
	}

	async getAll(): Promise<Competition[]> {
		return await this.prisma.competition.findMany()
	}

	async getById(id: number): Promise<Competition> {
		const athlete = await this.prisma.competition.findUnique({
			where: { id: +id }
		})
		if (!athlete) throw new NotFoundException(EXCEPTIONS.NOT_FOUND_EXCEPTION)
		return athlete
	}

	async update(id: number, dto: CompetitionDto) {
		await this.getById(id)
		return await this.prisma.competition.update({
			where: { id: +id },
			data: dto
		})
	}

	async delete(id: number) {
		await this.getById(id)

		await this.prisma.competition.delete({ where: { id: +id } })
	}
}
