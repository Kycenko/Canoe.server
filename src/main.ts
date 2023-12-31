import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as express from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: false })

	app.enableCors({ credentials: true, origin: true })
	app.use('/uploads', express.static('uploads'))
	//app.use('/uploads', express.static(join(__dirname, 'uploads')))

	const config = new DocumentBuilder().addBearerAuth().build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('swagger', app, document, {
		swaggerOptions: {
			persistAuthorization: true
		}
	})

	await app.listen(8888)
}
bootstrap()
