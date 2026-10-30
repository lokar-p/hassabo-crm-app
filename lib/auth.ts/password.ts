import argon2 from "argon2";



const ARGON2_OPTIONS: argon2.HashOptions = {

    type : argon2.argon2id,
    memoryCost: 24576, 
    timeCost : 3 , 
    parallelism : 2,
}

export default async function hashPassword(plainText: string): Promise<string>{

    return argon2.hash(plainText, ARGON2_OPTIONS);

}

const passwordhash = await hashPassword('123456')

console.log(passwordhash)

export async function verifyPassword(password: string , passwordHash : string) : Promise<boolean>{

return argon2.verify(passwordHash, password)

}