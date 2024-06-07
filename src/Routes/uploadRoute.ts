import { Router, Request, Response } from 'express';
import upload from '../Middleware/multer';
import cloudinary from '../utils/cloudinary';

const router = Router();

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded.'
        });
    }

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            data: result
        });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while uploading the file'
        });
    }
});
export default router
