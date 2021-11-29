import crypto from 'crypto'

const generatoRandomCode = async (): Promise<string> => {
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(24, function(err, buffer) {
            if(err){
                reject(err)
            }
            var token = buffer.toString('hex');
            resolve(token)
            });
    })
  }
  
  export default generatoRandomCode
  