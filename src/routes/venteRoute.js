import express from 'express';

import * as venteController from '../controllers/venteController.js'; 

const router = express.Router();

router.get('/ventes', venteController.getVentes);
router.post('/ventes', venteController.createVente);
router.put('/ventes/:numproduit', venteController.updateVente);
router.delete('/ventes/:numproduit', venteController.deleteVente);
router.get('/ventes/search', venteController.searchVente);

export default router;