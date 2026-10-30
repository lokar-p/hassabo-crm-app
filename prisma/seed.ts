import { Pool } from "pg";
import {PrismaClient} from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
})

pool.on('connect' , async (client)=>{
    await client.query('SET search_path TO hassabo_crm')
});



const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log : ['query']
})





async function main(){
    
    const schema = await prisma.$queryRawUnsafe(`
    SELECT current_schema();
`);
    console.log(schema);
    const result = await prisma.brokerRegistering.createMany({
        data: [
            
            {
                name: "عبدالرحمن الناير",
                phoneNumber: "0912305046"
            }
            ,
            {
                name: "لقمان",
                phoneNumber: "0912304340"
            }
            ,
            {
                name: "مهند حسن",
                phoneNumber: "0912305642"}
        ],
        skipDuplicates: true
    })
    console.log(`inserted {result.count} brokers.`)

}

main()
    .catch(e => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect()
    })