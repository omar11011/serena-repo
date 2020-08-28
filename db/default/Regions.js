const Regions = require('../../../../models/Regions')

const SyncRegions = () => {
    Regions.sync({force: true}).then(async () => {
        const regions = [
            Regions.upsert({ Region: 'Kanto' }),
            Regions.upsert({ Region: 'Johto' }),
            Regions.upsert({ Region: 'Hoenn' }),
            Regions.upsert({ Region: 'Sinnoh' }),
            // Regions.upsert({ Region: 'Teselia' }),
            // Regions.upsert({ Region: 'Kalos' }),
            // Regions.upsert({ Region: 'Alola' }),
            // Regions.upsert({ Region: 'Galar' }),
        ]
        await Promise.all(regions)
        console.log('DB Regions synced.');
    })
}

module.exports = { SyncRegions }