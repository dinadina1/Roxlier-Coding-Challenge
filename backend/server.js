// import required modules
const app = require('./app');
const connectDatabase = require('./config/database');

connectDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`,);
    
})
