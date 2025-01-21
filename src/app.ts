import express, {Application} from 'express';
import dotenv from 'dotenv';
import { Signale } from "signale";
import morgan from 'morgan';
import rateLimit from "express-rate-limit";
import { userRoute } from './users/infraestructure/routes/userRoutes';

const app:Application = express();

const signale = new Signale();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // SEA ACTUALIZA CONFORMA A LO QUE SE NECESITE DEPENDIENTE A LA API QUE SE ESTE REALIZANDO
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false
});

dotenv.config();

app.use(limiter);
app.use(morgan('dev'));
app.use(express.json());
app.use('/users',userRoute);

const PORT = process.env.PORT || 3001;

async function startServer() {

    app.listen(PORT,() => {
        signale.success(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

startServer();

