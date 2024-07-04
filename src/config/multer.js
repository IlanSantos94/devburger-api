import multer from 'multer'
import { request } from 'node:http'
import {extname, resolve} from 'node:path'
import { callbackify } from 'node:util'
import { v4 } from 'uuid'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            return callback(null, v4() + extname(file.originalname))
        }
    })
}