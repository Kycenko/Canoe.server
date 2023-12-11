import { Module } from '@nestjs/common'
import { AthleteService } from './athlete.service'
import { AthleteController } from './athlete.controller'
import { PrismaService } from '@prisma/prisma.service'

@Module({
	controllers: [AthleteController],
	providers: [AthleteService, PrismaService]
})
export class AthleteModule {}
