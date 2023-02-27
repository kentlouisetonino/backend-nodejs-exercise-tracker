import multer from 'multer'

/**
 * This will handle the upload of file from client and
 * store it in memory as buffer objects. This will also
 * allow to use the form-data payload.
 */
const formData = multer({ storage: multer.memoryStorage() })

export default formData
