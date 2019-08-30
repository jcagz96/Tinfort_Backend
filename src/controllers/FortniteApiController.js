const axios = require('axios')

module.exports = {
    async show(req, res){
        const { username } = req.body;
        const { plataform } = req.body;

        console.log(`\n[ FortniteApiController.js ] : username é: ${username}`)
        console.log(`\n[ FortniteApiController.js ] : plataforma é: ${plataform}`)
        
        var response =  await axios({
            method: 'get',
            url: `${process.env.FORTNITE_API_URL}/v1/profile/${plataform}/${username}`,
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json",
                'TRN-Api-Key': `${process.env.FORTNITE_TRN_API_KEY}`
            }
        })

        if(response.data.error === "Player Not Found"){
            console.log(`\n[ FortniteApiController.js ] : Utilizador com as stats privadas\n`)

            response =  await axios({
                method: 'get',
                url: `${process.env.FORTNITE_API_URL}/v1/profile/${plataform}/${plataform}(${username})`,
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'TRN-Api-Key': `${process.env.FORTNITE_TRN_API_KEY}`
                }
            })
        }

        

        
        const soloWins = response.data.stats.p2.top1.value;
        const soloGames = response.data.stats.p2.matches.value;
        const soloWinRate = response.data.stats.p2.winRatio.value;
        const soloKills = response.data.stats.p2.kills.value;
        const soloKillsDeathsWinRate = response.data.stats.p2.kd.value;
        


        console.log(`[ FortniteApiController.js ] : solo-->wins: ${soloWins}`)
        console.log(`[ FortniteApiController.js ] : solo-->games: ${soloGames}`)
        console.log(`[ FortniteApiController.js ] : solo-->win rate: ${soloWinRate}`)
        console.log(`[ FortniteApiController.js ] : solo-->kills: ${soloKills}`)
        console.log(`[ FortniteApiController.js ] : solo-->Kill / Death rate: ${soloKillsDeathsWinRate}\n`)


        const duosWins = response.data.stats.p10.top1.value;
        const duosGames = response.data.stats.p10.matches.value;
        const duosWinRate = response.data.stats.p10.winRatio.value;
        const duosKills = response.data.stats.p10.kills.value;
        const duosKillsDeathsWinRate = response.data.stats.p10.kd.value;
        


        console.log(`[ FortniteApiController.js ] : duos-->wins: ${duosWins}`)
        console.log(`[ FortniteApiController.js ] : duos-->games: ${duosGames}`)
        console.log(`[ FortniteApiController.js ] : duos-->win rate: ${duosWinRate}`)
        console.log(`[ FortniteApiController.js ] : duos-->kills: ${duosKills}`)
        console.log(`[ FortniteApiController.js ] : duos-->Kill / Death rate: ${duosKillsDeathsWinRate}\n`)


        const squadsWins = response.data.stats.p9.top1.value;
        const squadsGames = response.data.stats.p9.matches.value;
        const squadsWinRate = response.data.stats.p9.winRatio.value;
        const squadsKills = response.data.stats.p9.kills.value;
        const squadsKillsDeathsWinRate = response.data.stats.p9.kd.value;
        


        console.log(`[ FortniteApiController.js ] : squads-->wins: ${squadsWins}`)
        console.log(`[ FortniteApiController.js ] : squads-->games: ${squadsGames}`)
        console.log(`[ FortniteApiController.js ] : squads-->win rate: ${squadsWinRate}`)
        console.log(`[ FortniteApiController.js ] : squads-->kills: ${squadsKills}`)
        console.log(`[ FortniteApiController.js ] : squads-->Kill / Death rate: ${squadsKillsDeathsWinRate}\n`)
        
        
        const info = {
            plataform,
            solo: {
                soloWins,
                soloGames,
                soloWinRate,
                soloKills,
                soloKillsDeathsWinRate
            },
            duos: {
                duosWins,
                duosGames,
                duosWinRate,
                duosKills,
                duosKillsDeathsWinRate
            },
            squads: {
                squadsWins,
                squadsGames,
                squadsWinRate,
                squadsKills,
                squadsKillsDeathsWinRate
            }
        }
        
        
        res.json(info)
    }
}