import { Router } from 'express';
import multer = require('multer');
import { diskStorage, photoFilter } from '@utils/multer';

const router = Router();

const uploadFile = (req, res, next) => {
    switch (req.params.type) {
    case 'empleados':
        multer({
            storage: diskStorage('empleados-perfil'),
            fileFilter: photoFilter,
        }).single('file')(req, res, next);
    break;
    case 'productos':
        multer({
            storage: diskStorage('productos'),
            fileFilter: photoFilter,
        }).single('file')(req, res, next);
    break;
    default:
        res.status(400).json({
            status: 400,
            message: `Los archivo de tipo ${req.params.type} no son validos`,
        });
  }
};

router.post('/:type', uploadFile, async (req: any, res) => {
  const archivo = req.file;
  res.status(200).json({
    status: 200,
    message: `Archivo de tipo ${req.params.type} subido`,
    archivo,
  });
});

export default router;
