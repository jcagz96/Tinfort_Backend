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
            console.log(`\n[ FortniteApiController.js ] : Utilizador com as stats privadas ou nao existe\n`)

            response =  await axios({
                method: 'get',
                url: `${process.env.FORTNITE_API_URL}/v1/profile/${plataform}/${plataform}(${username})`,
                headers: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'TRN-Api-Key': `${process.env.FORTNITE_TRN_API_KEY}`
                }
            })

            if(response.data.error === "Player Not Found"){
                console.log(`\n[ FortniteApiController.js ] : o player nao existe mesmo\n`)
                return res.json(response.data)
            }
        }
             
        const info = {
            plataform,
            solo: {
                soloWins : response.data.stats.p2.top1.value,
                soloGames : response.data.stats.p2.matches.value,
                soloWinRate : response.data.stats.p2.winRatio.value,
                soloKills : response.data.stats.p2.kills.value,
                soloKillsDeathsWinRate : response.data.stats.p2.kd.value
            },
            duos: {
                duosWins : response.data.stats.p10.top1.value,
                duosGames : response.data.stats.p10.matches.value,
                duosWinRate : response.data.stats.p10.winRatio.value,
                duosKills : response.data.stats.p10.kills.value,
                duosKillsDeathsWinRate : response.data.stats.p10.kd.value
            },
            squads: {
                squadsWins : response.data.stats.p9.top1.value,
                squadsGames : response.data.stats.p9.matches.value,
                squadsWinRate : response.data.stats.p9.winRatio.value,
                squadsKills : response.data.stats.p9.kills.value,
                squadsKillsDeathsWinRate : response.data.stats.p9.kd.value
            }
        }
        
        
        res.json(info)
    }
}