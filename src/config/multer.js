const multer = require('multer');               //middleware
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp','uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (erro, hash) => {
                if(erro){
                    cb(erro)
                    
                }
                
                file.key = `${hash.toString('hex')}-${file.originalname}`            // gerando uma concatenaçao entre carateres aleatorio e o nome da imagem enviada
                cb(null, file.key);
            })
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'uploadexample22',
        contentType: multerS3.AUTO_CONTENT_TYPE,    //para que o arquivo seja aberto na browser quando acessado
        acl: 'public-read',
        key: (req, file, cb) =>{
            crypto.randomBytes(16, (erro, hash) => {
                if(erro){
                    cb(erro)
                    
                }
                
                const fileName = `${hash.toString('hex')}-${file.originalname}`            // gerando uma concatenaçao entre carateres aleatorio e o nome da imagem enviada
                cb(null, fileName);
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp','uploads'),  //dirname refere-se ao diretorio config, e eu quero que as imagens descam 2 niveis de pastas, e que abram a pasta tmp e a pasta uploads
    storage: storageTypes[process.env.STORAGE_TYPE],                              // storageTypes["local"] armazenamento local |  storageTypes["s3"]  armazenamento na amazon
    limits: {                                           //para definir tamanho maximo dos arquivos
        fileSize: 80 * 1024 * 1024,      //2 megabytes
    },
    fileFilter: (req, file, cb) => {                               //para definir o tipo/extensao do arquivo //file é o arquivo //cb é o callback , é uma funcao que vamos chamar assim que terminar a verificação
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if ( allowedMimes.includes(file.mimetype)){
            cb(null, true);                             //caso dê sucesso
        }
        else{
            cb(new Error('Invalid file type'))
        }
    }
} 