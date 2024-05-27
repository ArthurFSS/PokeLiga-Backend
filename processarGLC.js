// processarResultados.js

import { query } from './db.js';

async function processarGLC(data, ligaId, badge) {
    try {
        // Busca o jogador com place = 1 na data e liga especificadas
        
        const result = await query(`
            SELECT player_id FROM standins
            WHERE place = 1 AND data = '${data}' AND liga = ${ligaId}
        `);
        
        const playerId = result[0].player_id;
        const badgeColumn = `badge${badge}`;
        
        const resultBadge = await query(`
        SELECT player_id FROM glcBadges
        WHERE player_id = '${playerId}'
        `);
        
        if(resultBadge[0] === undefined){  
            console.log('3');
            await query(`
                    INSERT INTO glcBadges (player_id, ${badgeColumn}, lastWinDate)
                    VALUES (${playerId}, true, '${data}')
                `);}
        else{
            await query(`UPDATE glcBadges SET ${badgeColumn} = true, lastWinDate = '${data}' where player_id = '${playerId}'`);
}
    
    } catch (error) {
        console.error('Erro ao processar resultados:', error);
        throw new Error('Erro ao processar resultados.');
    }
}

export default processarGLC;