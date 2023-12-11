import { diskStorage } from 'multer'
import * as path from 'path'

export const fileStorage = (folder: string) =>
	diskStorage({
		destination: folder,
		filename: (req, file, callback) => {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
			const extension = path.extname(file.originalname)
			callback(null, file.fieldname + '-' + uniqueSuffix + extension)
		}
	})
