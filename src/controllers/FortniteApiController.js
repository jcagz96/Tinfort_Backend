const axios = require('axios')

module.exports = {
    async show(req, res){
        const { username } = req.body;
        console.log(`username é: ${username}`)
        
    
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

        console.log('ID: ', id)


        const responseStatsV2 =  await axios({
            method: 'post',
            url: `${process.env.FORTNITE_API_URL}/prod09/users/public/br_stats_v2?user_id=${id}`,
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json",
                'authorization': `${process.env.FORTNITE_TOKEN_SECRET}` 
            }
        })


        res.json(responseStatsV2.data)
    }
}