import JWT from "jsonwebtoken"

interface userTokenPayload{
    id: string
}

const jwt_secret='jalpp'

export function createUserToken(payload: userTokenPayload) {
    const token = JWT.sign(payload, jwt_secret)

    return token;
}

export function verifyUserToken(token: string) {
    try{
        const payload = JWT.verify(token, jwt_secret) as userTokenPayload 
        return payload;
    }catch(err){
        return null;
    }
    
}