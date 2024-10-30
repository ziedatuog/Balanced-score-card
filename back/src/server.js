const http=require('http');
const app=require('./app');
const startConnection=require('./services/mongo')
const PORT=5001;
const server=http.createServer(app);

async function startServer(){
    await startConnection();
    server.listen(PORT,()=>{
        console.log(`the server is running on ${PORT}`)
    })
}
startServer();