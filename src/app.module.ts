import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '@prisma/prisma.service'
import { AuthModule } from './auth/auth.module'
import { AthleteModule } from './athlete/athlete.module';
import { UserModule } from './user/user.module';
import { CompetitionModule } from './competition/competition.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, AthleteModule, UserModule, CompetitionModule],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}
