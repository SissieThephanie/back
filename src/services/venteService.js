import { query } from "../db.js";

export const getVentes = async () => {
    const rows = await query("SELECT * FROM ventes");
    return rows;
}

export const createVente = async (venteData) => {
    const { design, prix , quantite} = venteData;

    const rows = await query(
        "INSERT INTO ventes (design,prix, quantite) VALUES ($1, $2, $3) RETURNING *",
        [design,prix,quantite]);
    return rows[0];
}

export const updateVente = async (venteData, venteId) => {
    const { design, prix, quantite } = venteData;
    const { rowCount } = await query(
        "UPDATE ventes SET design = $1, prix = $2, quantite = $3 WHERE numproduit = $4",
        [design, prix, quantite, venteId]
    );
    return rowCount > 0; // true si au moins une ligne a été modifiée
};

export const deleteVente = async (venteId) => {
    const { rowCount } = await query(
        "DELETE FROM ventes WHERE numproduit = $1",
        [venteId]);
    return rowCount > 0;
}

export const searchTerm = async (searchTerm) => {
    const rows = await query(
        "SELECT * FROM ventes WHERE design ILIKE $1 OR prix::text ILIKE $1 OR quantite::text ILIKE $1 OR numproduit::text ILIKE $1",
        [`%${searchTerm}%`]);
    return rows;
}