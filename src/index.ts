import {createServer} from 'node:http'
import { createApp } from "./app/index.js";

async function main(){
    try {
        const app = createApp();
        const server = createServer(app);
        
        const port : number = 8080;

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch(error) {
        console.error('Error starting server:', error);
    }
}



main();
