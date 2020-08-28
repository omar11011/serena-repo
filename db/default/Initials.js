const Initials = require('../../../../models/Initials')

const SyncInitials = () => {
    Initials.sync({force: true}).then(async () => {
        const initials = [
            Initials.upsert({ Pokemon: 'Bulbasaur', Type: 'Planta', Region: 'Kanto' }),
            Initials.upsert({ Pokemon: 'Charmander', Type: 'Fuego', Region: 'Kanto' }),
            Initials.upsert({ Pokemon: 'Squirtle', Type: 'Agua', Region: 'Kanto' }),
            Initials.upsert({ Pokemon: 'Chikorita', Type: 'Planta', Region: 'Johto' }),
            Initials.upsert({ Pokemon: 'Cyndaquil', Type: 'Fuego', Region: 'Johto' }),
            Initials.upsert({ Pokemon: 'Totodile', Type: 'Agua', Region: 'Johto' }),
            Initials.upsert({ Pokemon: 'Treecko', Type: 'Planta', Region: 'Hoenn' }),
            Initials.upsert({ Pokemon: 'Torchic', Type: 'Fuego', Region: 'Hoenn' }),
            Initials.upsert({ Pokemon: 'Mudkip', Type: 'Agua', Region: 'Hoenn' }),
            Initials.upsert({ Pokemon: 'Turtwig', Type: 'Planta', Region: 'Sinnoh' }),
            Initials.upsert({ Pokemon: 'Chimchar', Type: 'Fuego', Region: 'Sinnoh' }),
            Initials.upsert({ Pokemon: 'Piplup', Type: 'Agua', Region: 'Sinnoh' }),
            Initials.upsert({ Pokemon: 'Snivy', Type: 'Planta', Region: 'Teselia' }),
            Initials.upsert({ Pokemon: 'Tepig', Type: 'Fuego', Region: 'Teselia' }),
            Initials.upsert({ Pokemon: 'Oshawott', Type: 'Agua', Region: 'Teselia' }),
            Initials.upsert({ Pokemon: 'Chespin', Type: 'Planta', Region: 'Kalos' }),
            Initials.upsert({ Pokemon: 'Fennekin', Type: 'Fuego', Region: 'Kalos' }),
            Initials.upsert({ Pokemon: 'Froakie', Type: 'Agua', Region: 'Kalos' }),
            Initials.upsert({ Pokemon: 'Rowlet', Type: 'Planta', Region: 'Alola' }),
            Initials.upsert({ Pokemon: 'Litten', Type: 'Fuego', Region: 'Alola' }),
            Initials.upsert({ Pokemon: 'Popplio', Type: 'Agua', Region: 'Alola' }),
            Initials.upsert({ Pokemon: 'Grookey', Type: 'Planta', Region: 'Galar' }),
            Initials.upsert({ Pokemon: 'Scorbunny', Type: 'Fuego', Region: 'Galar' }),
            Initials.upsert({ Pokemon: 'Sobble', Type: 'Agua', Region: 'Galar' }),
        ]
        await Promise.all(initials)
        console.log('DB Initials synced.');
    })
}

module.exports = { SyncInitials }