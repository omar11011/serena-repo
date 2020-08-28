const Stone = require('../data/items/stone')
const Mega = require('../data/items/mega')
const Mint = require('../data/items/mint')
const Vitamin = require('../data/items/vitamin')
const Pokeball = require('../data/items/pokeball')
const EvolveItem = require('../data/items/evolveItems')
const Exchange = require('../data/items/exchange')

const DataItem = (Item, Request) => {
    let Use = false
    let Emoji = ''
    let Price = 'Its not for sale'

    if(Stone.includes(Item)) {
        Use = "Evolve Stone"

        if(Item === "Water Stone") Emoji = '<:water_stone:732357741401866262>', Price = 2100 // Piedra Agua
        else if(Item === "Fire Stone") Emoji = '<:fire_stone:732357739686264843>', Price = 2100 // Piedra Fuego
        else if(Item === "Leaf Stone") Emoji = '<:leaf_stone:732357740902613012>', Price = 2100 // Piedra Hoja
        else if(Item === "Thunder Stone") Emoji = '<:thunder_stone:732357741028573256>', Price = 3000 // Piedra Trueno
        else if(Item === "Ice Stone") Emoji = '<:ice_stone:732357740881641602>', Price = 5000 // Piedra Hielo
        else if(Item === "Sun Stone") Emoji = '<:sun_stone:732357741301203146>' // Piedra Solar
        else if(Item === "Moon Stone") Emoji = '<:moon_stone:732357740655280130>' // Piedra Lunar
        else if(Item === "Day Stone") Emoji = '<:day_stone:732357739917082704>' // Piedra Día
        else if(Item === "Night Stone") Emoji = '<:night_stone:732357741351272568>' // Piedra Noche
        else if(Item === "Alba Stone") Emoji = '<:alba_stone:732357739803836529>' // Piedra Alba
    }
    else if(Mega.includes(Item)) {
        Use = "Mega Stone"

        if(Item === "Venusaurita") Emoji = '<:venusaurita:732377701922504775>' // Venusaurita
        else if(Item === "Charizardita X") Emoji = '<:charizardita_x:732377702061047898>' // Charizardita X
        else if(Item === "Charizardita Y") Emoji = '<:charizardita_y:732377702165643284>' // Charizardita Y
        else if(Item === "Blastoisita") Emoji = '<:blastoisita:732377701305942077>' // Blastoisita
        else if(Item === "Butterfrita") Emoji = '' // Butterfrita
        else if(Item === "Beedrillita") Emoji = '<:beedrillita:744685415243710536>' // Beedrillita
        else if(Item === "Pidgeotita") Emoji = '<:pidgeotita:744685456817520791>' // Pidgeotita
        else if(Item === "Raticatita") Emoji = '' // Raticatita
        else if(Item === "Fearowita") Emoji = '' // Fearowita
        else if(Item === "Arbokita") Emoji = '' // Arbokita
        else if(Item === "Ninetalesita") Emoji = '' // Ninetalesita
        else if(Item === "Vileplumita") Emoji = '' // Vileplumita
        else if(Item === "Venomothita") Emoji = '' // Venomothita
        else if(Item === "Persianita") Emoji = '' // Persianita
        else if(Item === "Golduckita") Emoji = '' // Golduckita
        else if(Item === "Arcanita X") Emoji = '' // Arcanita X
        else if(Item === "Arcanita Y") Emoji = '' // Arcanita Y
        else if(Item === "Alakazamita") Emoji = '<:alakazamita:744685509543985172>' // Alakazamita
        else if(Item === "Rapidashita") Emoji = '' // Rapidashita 
        else if(Item === "Slowbronita") Emoji = '<:slowbronita:744686270390730822>' // Slowbronita
        else if(Item === "Dodriosita X") Emoji = '' // Dodriosita X
        else if(Item === "Dodriosita Y") Emoji = '' // Dodriosita Y
        else if(Item === "Gengarita") Emoji = '<:gengarita:744687299794567219>' // Gengarita
        else if(Item === "Marowakita") Emoji = '' // Marowakita
        else if(Item === "Kangaskhanita") Emoji = '<:kangaskhanita:744687406263042101>' // Kangaskhanita
        else if(Item === "Starmita") Emoji = '' // Starmita
        else if(Item === "Scizorita") Emoji = '<:scizorita:744687572097433712>' // Scizorita
        else if(Item === "Pinsirita") Emoji = '<:pinsirita:744687558411157624>' // Pinsirita
        else if(Item === "Gyaradosita") Emoji = '<:gyaradosita:744687318623060018>' // Gyaradosita
        else if(Item === "Laprasita") Emoji = '' // Laprasita 
        else if(Item === "Vaporeonsita") Emoji = '' // Vaporeonsita
        else if(Item === "Jolteonsita") Emoji = '' // Jolteonsita
        else if(Item === "Flareonsita") Emoji = '' // Flareonsita
        else if(Item === "Aerodactylita") Emoji = '<:aerodactylita:744687755422072933>' // Aerodactylita
        else if(Item === "Dragonitesita") Emoji = '' // Dragonitesita
        else if(Item === "Mewtwoita X") Emoji = '<:mewtwoita_x:744688324513497271>' // Mewtwoita X
        else if(Item === "Mewtwoita Y") Emoji = '<:mewtwoita_y:744688339592151062>' // Mewtwoita Y
        else if(Item === "Mewita") Emoji = '' // Mewita
        else if(Item === "Typhlosionita") Emoji = '' // Typhlosionita
        else if(Item === "Ampharosita") Emoji = '<:ampharosita:744689047242408057>' // Ampharosita
        else if(Item === "Steelixita") Emoji = '<:steelixita:744689076074053682>' // Steelixita
        else if(Item === "Sceptilita") Emoji = '<:sceptilita:744689099180605601>' // Sceptilita
        else if(Item === "Blazikenita") Emoji = '<:blazikenita:744689124430053386>' // Blazikenita
        else if(Item === "Swampertita") Emoji = '<:swampertita:744689140926513222>' // Swampertita
        else if(Item === "Houndoomita") Emoji = '<:houndoomita:744689417385410631>' // Houndoomita
        else if(Item === "Tyranitarita") Emoji = '<:tyranitarita:744689482821009470>' // Tyranitarita
        else if(Item === "Gardevoirita") Emoji = '<:gardevoirita:744689430866034799>' // Gardevoirita
        else if(Item === "Sableynita") Emoji = '<:sableynita:744689495517167720>' // Sableynita
        else if(Item === "Mawilita") Emoji = '<:mawilita:744689531151974441>' // Mawilita
        else if(Item === "Aggronita") Emoji = '<:aggronita:744689541511905451>' // Aggronita
        else if(Item === "Medichamita") Emoji = '<:medichamita:744689553780113468>' // Medichamita
        else if(Item === "Manectricita") Emoji = '<:manectricita:744689584385949736>' // Manectricita
        else if(Item === "Sharpedonita") Emoji = '<:sharpedonita:744689593470681108>' // Sharpedonita
        else if(Item === "Cameruptita") Emoji = '<:cameruptita:744689621090173030>' // Cameruptita
        else if(Item === "Altarianita") Emoji = '<:altarianita:744689630707843122>' // Altarianita
    }
    else if(Mint.includes(Item)) {
        Use = "Mint"
    }
    else if(Vitamin.includes(Item)) {
        Use = "Vitamin"

        if(Item === "Carbos") Emoji = '<:carbos:732404935374929921>', Price = 9800 // Carburante
        else if(Item === "Calcium") Emoji = '<:calcium:732404934477086782>', Price = 9800 // Calcio
        else if(Item === "Protein") Emoji = '<:protein:732404937174286376>', Price = 9800 // Proteína
        else if(Item === "Iron") Emoji = '<:iron:732404935165083800>', Price = 9800 // Hierro
        else if(Item === "Zinc") Emoji = '<:zinc:732402966144745502>', Price = 9800 // Zinc
        else if(Item === "More Ps") Emoji = '<:more_ps:732404937316761693>', Price = 9800 // Más Ps
        else if(Item === "Rare Candy") Emoji = '<:rare_candy:732404938705076305>', Price = 15000 // Caramelo Raro
    }
    else if(Pokeball.includes(Item)) {
        Use = "Pokeball"

        if(Item === "Poke Ball") Emoji = '<:pokeball:733179992481202229>', Price = 50 // Poke Ball
        else if(Item === "Friend Ball") Emoji = '<:amigo_ball:733179992610963466>', Price = 200 // Amigo Ball
        else if(Item === "Luxury Ball") Emoji = '<:lujo_ball:733518077014310913>', Price = 200 // Lujo Ball
        else if(Item === "Premier Ball") Emoji = '<:honor_ball:733515614492033055>', Price = 200 // Honor Ball
        else if(Item === "Heal Ball") Emoji = '<:sana_ball:733515618019573791>', Price = 200 // Sana Ball
        else if(Item === "Cherish Ball") Emoji = '<:gloria_ball:733515613485662329>', Price = 200 // Gloria Ball
        else if(Item === "Dream Ball") Emoji = '<:ensueo_ball:733515613519216651>', Price = 200 // Ensueño Ball
        else if(Item === "Great Ball") Emoji = '<:super_ball:733515618082357329>', Price = 600 // Super Ball 
        else if(Item === "Ultra Ball") Emoji = '<:ultra_ball:733515617918910536>', Price = 800 // Ultra Ball
        else if(Item === "Master Ball") Emoji = '<:master_ball:733515615222104185>' // Master Ball
        else if(Item === "Net Ball") Emoji = '<:malla_ball:733515614848548964>', Price = 350 // Malla Ball
        else if(Item === "Nest Ball") Emoji = '<:nido_ball:733518670453538888>', Price = 1000 // Nido Ball
        else if(Item === "Dive Ball") Emoji = '<:buceo_ball:733515611027537986>', Price = 1100 // Buceo Ball
        else if(Item === "Repeat Ball") Emoji = '<:acopio_ball:733515606082584626>', Price = 1100 // Acopio Ball
        else if(Item === "Timer Ball") Emoji = '<:turno_ball:733515618015510579>', Price = 1000 // Turno Ball
        else if(Item === "Dusk Ball") Emoji = '<:ocaso_ball:733515617247952908>', Price = 1100 // Ocaso Ball
        else if(Item === "Fast Ball") Emoji = '<:rapid_ball:733515617159872625>', Price = 1350 // Rapid Ball
        else if(Item === "Level Ball") Emoji = '<:nivel_ball:733515615398264832>', Price = 1700 // Nivel Ball
        else if(Item === "Love Ball") Emoji = '<:amor_ball:733515606875308112>', Price = 200 // Amor Ball
        else if(Item === "Lure Ball") Emoji = '<:cebo_ball:733515612512321626>', Price = 1500 // Cebo Ball
        else if(Item === "Moon Ball") Emoji = '<:luna_ball:733519892833108008>', Price = 1200 // Luna Ball
        else if(Item === "Beast Ball") Emoji = '<:ente_ball:733515613795909684>', Price = 10000 // Ente Ball
        else if(Item === "Sport Ball") Emoji = '<:competi_ball:733520437165948971>', Price = 600 // Competi Ball
        else if(Item === "Park Ball") Emoji = '<:parque_ball:733515617247690752>', Price = 600 // Parque Ball
        else if(Item === "Quick Ball") Emoji = '<:veloz_ball:733515617956790273>', Price = 1600 // Veloz Ball
    }
    else if(EvolveItem.includes(Item)) {
        Use = "Evolve Item"

        if(Item === "Dragon Scale") Emoji = '<:dragon_scale:744677327631286472>', Price = 1050 // Escama Dragón
        else if(Item === "King's Rock") Emoji = '<:king_rock:744677329602871498>', Price = 50 // Roca del Rey
        else if(Item === "Dubious Disc") Emoji = '<:dubious_disc:744677328893771937>', Price = 1050 // Disco Extraño
        else if(Item === "Sea Tooth") Emoji = '<:sea_tooth:744677340151283812>', Price = 100 // Diente Marino
        else if(Item === "Sea Scale") Emoji = '<:sea_scale:744677339744436296>', Price = 100 // Escama Marina
        else if(Item === "Reaper Cloth") Emoji = '<:reaper_cloth:744677339421605979>', Price = 1050 // Tela Terrible
        else if(Item === "Razor Fang") Emoji = '<:razor_fang:744677339283062834>', Price = 1050 // Colmillo Agudo
        else if(Item === "Razor Claw") Emoji = '<:razor_claw:744677338842791936>', Price = 1050 // Garra Afilada
        else if(Item === "Oval Stone") Emoji = '<:oval_stone:744677335487348806>', Price = 1050 // Piedra Oval
        else if(Item === "Prism Scale") Emoji = '<:prism_scale:744677336661753926>', Price = 250 // Escama Bella
        else if(Item === "Whipped Dream") Emoji = '<:whipped_dream:744677340763652166>', Price = 1050 // Dulce de Nata
        else if(Item === "Sachet") Emoji = '<:sachet:744677339258028093>', Price = 1050 // Saquito Fragante
        else if(Item === "Tart Apple") Emoji = '<:tart_apple:744677340088500315>', Price = 1100 // Manzana Ácida
        else if(Item === "Sweet Apple") Emoji = '<:sweet_apple:744677340361261149>', Price = 1100 // Manzana Dulce
        else if(Item === "Chipped Pot") Emoji = '<:chipped_pot:744677328067756183>', Price = 19000 // Tetera Rota
        else if(Item === "Galarica Cuff") Emoji = '<:galarica_cuff:744677329028251780>', Price = 3000 // Brazal Galanuez
    }
    else if(Exchange.includes(Item)) {
        Use = "Exchange"
        if(Item === "Twisted Spoon")  Emoji = '<:twisted_spoon:744680162796240931>', Price = 3000
        else if(Item === "Black Belt")  Emoji = '<:black_belt:744680162628731041>', Price = 3000
        else if(Item === "Hard Stone")  Emoji = '<:hard_stone:744680162398044291>', Price = 1800
        else if(Item === "Spell Tag")  Emoji = '<:spell_tag:744680162494513245>', Price = 3000
        else if(Item === "Metal Coat") Emoji = '<:metal_coat:744677333046132867>', Price = 1000 // Revestimiento Metálico
        else if(Item === "Protector") Emoji = '<:protector:744677337659867198>', Price = 1050 // Protector
        else if(Item === "Electirizer") Emoji = '<:electirizer:744677328705159230>', Price = 1050 // Electrizador
        else if(Item === "Magmarizer") Emoji = '<:magmarizer:744677330089148479>', Price = 1050 // Magmatizador
        else if(Item === "Upgrade") Emoji = '<:upgrade:744677340893937725>', Price = 1000 // Mejora
    }
    else if(Item === "Pokecuarto") Emoji = '<:pokecuarto:733817385345351680>'
    else if(Item === "Store") Emoji = '<:store:733811752290091108>'
    else if(Item === "Backpack") Emoji = '<:mochila:734460019877085234>'
    else if(Item === "Pokelito") Emoji = '<:pokelito:742183135344722023>', Price = 30
    else if(Item === "Box") Emoji = '<:box:744668699402829925>'

    // Fish
    else if(Item === "Remoraid") Emoji = '<:Remoraid:742261122778005504>'
    else if(Item === "Basculin") Emoji = '<:Basculin:742261122693857280>'
    else if(Item === "Goldeen") Emoji = '<:Goldeen:742261122563964988>'
    else if(Item === "Magikarp") Emoji = '<:Magikarp:742261122597650442>'
    else if(Item === "Carvanha") Emoji = '<:Carvanha:742261122576678922>'
    else if(Item === "Feebas") Emoji = '<:Feebas:742261122639331338>'
    else if(Item === "Relicanth") Emoji = '<:Relicanth:742261122534735883>'

    // Ribbons
    else if(Item === "Kanto Champion Ribbon") Emoji = '<:ribbon1:742464338547310744>'
    else if(Item === "Johto Champion Ribbon") Emoji = '<:ribbon1:742464338547310744>'
    else if(Item === "Hoenn Champion Ribbon") Emoji = '<:ribbon1:742464338547310744>'
    else if(Item === "Coolness Master Ribbon") Emoji = '<:carisma:742464303629598730>'
    else if(Item === "Beauty Master Ribbon") Emoji = '<:belleza:742464300152651848>'
    else if(Item === "Cuteness Master Ribbon") Emoji = '<:dulzura:742464304477110448>'
    else if(Item === "Cleverness Master Ribbon") Emoji = '<:ingenio:742464306397839391>'
    else if(Item === "Toughness Master Ribbon") Emoji = '<:dureza:742464306565742673>'

    if(Request === "Use") return Use
    else if(Request === "Emoji") return Emoji
    else if(Request === "Price") return Price
}

module.exports = { DataItem }