import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConnection";
import userRouter from "./routes/user.routes";
import petRouter from "./routes/pet.routes";
import petImageRouter from "./routes/petImage.routes";
import serviceRoutes from "./routes/service.routes";
import userImageRouter from "./routes/userImage.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());         
app.use(express.json()); 

async function main(){
   try{
      await connectDB();
      app.use(userRouter);
      app.use(petRouter);
      app.use(petImageRouter);
      app.use(serviceRoutes);
      app.use(userImageRouter);


     app.listen(port, () => {
     console.log(`Server is running at http://localhost:${port}`);
     });
  }catch(error: any){
     throw new Error("error")
  }}
main();
