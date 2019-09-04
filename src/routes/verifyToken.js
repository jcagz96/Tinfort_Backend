const jwt =  require('jsonwebtoken')

//Middleware

module.exports = function(req, res, next){
    const token = req.header('auth-token')

    if( !token ) { return res.status(401).send('Access Denied') }          //checkando se o header tem o auth-token 

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified   //se foi verificado adicona-se essa info ao request   //req.user pois pode ser acedido em qq lado
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }

}