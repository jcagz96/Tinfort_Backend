const axios = require('axios')

module.exports = {
    async show(req, res){
        const { username } = req.body;

        console.log(`\n[ FortniteApiController.js ] : username é: ${username}`)
        
    
        const responseUid =  await axios({
            method: 'post',
            url: `${process.env.FORTNITE_API_URL}/users/id?username=${username}`,
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json",
                'authorization': `${process.env.FORTNITE_TOKEN_SECRET}` 
            }
        })

        const id = responseUid.data.data["uid"];

        console.log(`->>>>>>>  ${responseUid.data}`)

        console.log(`[ FortniteApiController.js ] : ID: ${id}\n`)


        const responseStatsV2 =  await axios({
            method: 'post',
            url: `${process.env.FORTNITE_API_URL}/prod09/users/public/br_stats_v2?user_id=${id}`,
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json",
                'authorization': `${process.env.FORTNITE_TOKEN_SECRET}` 
            }
        })

        
        const duosWins = responseStatsV2.data.data.stats.keyboardmouse[0].entries[0].stats.placetop1;
        const duosGames = responseStatsV2.data.data.stats.keyboardmouse[0].entries[0].stats.matchesplayed;
        const duosWinRate = (duosWins / duosGames) * 100;
        const duosKills = responseStatsV2.data.data.stats.keyboardmouse[0].entries[0].stats.kills;
        const duosDeaths = duosGames - duosWins;
        const duosKillsDeathsWinRate = duosKills / duosDeaths;




        console.log(`[ FortniteApiController.js ] : duos: ${responseStatsV2.data.data.stats.keyboardmouse[0].id}`)
        console.log(`[ FortniteApiController.js ] : duos-->wins: ${duosWins}`)
        console.log(`[ FortniteApiController.js ] : duos-->games: ${duosGames}`)
        console.log(`[ FortniteApiController.js ] : duos-->win rate: ${duosWinRate}`)
        console.log(`[ FortniteApiController.js ] : duos-->kills: ${duosKills}`)
        console.log(`[ FortniteApiController.js ] : duos-->deaths: ${duosDeaths}`)
        console.log(`[ FortniteApiController.js ] : duos-->Kill / Death rate: ${duosKillsDeathsWinRate}\n`)



        
        const squadsWins = responseStatsV2.data.data.stats.keyboardmouse[9].entries[0].stats.placetop1;
        const squadsGames = responseStatsV2.data.data.stats.keyboardmouse[9].entries[0].stats.matchesplayed;
        const squadsWinRate = (squadsWins / squadsGames) * 100;
        const squadsKills = responseStatsV2.data.data.stats.keyboardmouse[9].entries[0].stats.kills;
        const squadsDeaths = squadsGames - squadsWins;
        const squadsKillsDeathsWinRate = squadsKills / squadsDeaths;


        console.log(`[ FortniteApiController.js ] : squads: ${responseStatsV2.data.data.stats.keyboardmouse[0].id}`)
        console.log(`[ FortniteApiController.js ] : squads-->wins: ${squadsWins}`)
        console.log(`[ FortniteApiController.js ] : squads-->games: ${squadsGames}`)
        console.log(`[ FortniteApiController.js ] : squads-->win rate: ${squadsWinRate}`)
        console.log(`[ FortniteApiController.js ] : squads-->kills: ${squadsKills}`)
        console.log(`[ FortniteApiController.js ] : squads-->deaths: ${squadsDeaths}`)
        console.log(`[ FortniteApiController.js ] : squads-->Kill / Death rate: ${squadsKillsDeathsWinRate}\n`)



        const soloWins = responseStatsV2.data.data.stats.keyboardmouse[29].entries[0].stats.placetop1;
        const soloGames = responseStatsV2.data.data.stats.keyboardmouse[29].entries[0].stats.matchesplayed;
        const soloWinRate = (soloWins / soloGames) * 100;
        const soloKills = responseStatsV2.data.data.stats.keyboardmouse[29].entries[0].stats.kills;
        const soloDeaths = soloGames - soloWins;
        const soloKillsDeathsWinRate = soloKills / soloDeaths;


        console.log(`[ FortniteApiController.js ] : solo: ${responseStatsV2.data.data.stats.keyboardmouse[0].id}`)
        console.log(`[ FortniteApiController.js ] : solo-->wins: ${soloWins}`)
        console.log(`[ FortniteApiController.js ] : solo-->games: ${soloGames}`)
        console.log(`[ FortniteApiController.js ] : solo-->win rate: ${soloWinRate}`)
        console.log(`[ FortniteApiController.js ] : solo-->kills: ${soloKills}`)
        console.log(`[ FortniteApiController.js ] : solo-->deaths: ${soloDeaths}`)
        console.log(`[ FortniteApiController.js ] : solo-->Kill / Death rate: ${soloKillsDeathsWinRate}\n`)


        const info = {
            solo: {
                soloWins,
                soloGames,
                soloWinRate,
                soloKills,
                soloDeaths,
                soloKillsDeathsWinRate
            },
            duos: {
                duosWins,
                duosGames,
                duosWinRate,
                duosKills,
                duosDeaths,
                duosKillsDeathsWinRate
            },
            squads: {
                squadsWins,
                squadsGames,
                squadsWinRate,
                squadsKills,
                squadsDeaths,
                squadsKillsDeathsWinRate
            }
        }

        

        //res.json(responseStatsV2.data.data.stats.keyboardmouse)
        res.json(info)
    }
}