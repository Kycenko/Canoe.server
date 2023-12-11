import { Module, NotFoundException } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '@prisma/prisma.service'
import { UserDto } from './dto/user.dto'
import { User } from '@prisma/client'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService]
})
export class UserModule {
	constructor(private prisma: PrismaService) {}

	async create(dto: UserDto): Promise<User> {
		return await this.prisma.user.create({ data: dto })
	}

	async getAll(): Promise<User[]> {
		return await this.prisma.user.findMany()
	}

	async getById(id: number): Promise<User> {
		const athlete = await this.prisma.user.findUnique({ where: { id: +id } })
		if (!athlete) throw new NotFoundException(EXCEPTIONS.NOT_FOUND_EXCEPTION)
		return athlete
	}

	async update(id: number, dto: UserDto) {
		await this.getById(id)
		return await this.prisma.user.update({ where: { id: +id }, data: dto })
	}

	async delete(id: number) {
		await this.getById(id)

		await this.prisma.user.delete({ where: { id: +id } })
	}
}
