import { query } from '../db.js'; 
import * as venteService from '../services/venteService.js';


export const getVentes = async (req, res) => {
    try {
        const result = await query('SELECT * FROM ventes'); 
        return res.json(result.rows); // Ajoute `.rows`
    } catch (err) {
        console.error('Erreur lors de la récupération des ventes:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const createVente = async (req, res) => {
    try {
        const venteData = req.body;
        const newVente = await venteService.createVente(venteData);
        return res.status(201).json(newVente); 
    } catch (err) {
        console.error('Erreur lors de la creation des ventes:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

export const updateVente = async (req, res) => {
    try {
        const venteId = req.params.id;
        const venteData = req.body;
        const updatedVente = await venteService.updateVente(venteData,venteId);
        if (!updatedVente) {
            return res.status(404).json({ error: 'Vente non trouvée' });
        }
        res.status(200).json(updatedVente); 
    } catch (err) {
        console.error('Erreur lors de la modification des ventes:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

export const deleteVente = async (req, res) => {
    try {
        const venteId = req.params.id;
        const deleted = await venteService.deleteVente(venteId);
        if (!deleted) {
            return res.status(404).json({ error: 'Vente non trouvée' });
        }
        res.status(204).send(); 
    } catch (err) {
        console.error('Erreur lors de la suppression des ventes:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

export const searchVente = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const ventes = await venteService.searchTerm(searchTerm);
        res.status(200).json(ventes);
    } catch (err) {
        console.error('Erreur lors de la recherche des ventes:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}