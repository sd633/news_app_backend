import express from "express"
import "dotenv/config"
import apiRoutes from "./routes/api.js"
import fileUpload from "express-fileupload";
import { limiter } from "./config/rateLimit.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import logger from "./config/logger.js";

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(fileUpload())
app.use(helmet())
app.use(cors())
app.use(limiter)

//routes
app.use("/api", apiRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})