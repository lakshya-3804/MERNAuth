import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app=express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true,
}));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());

import AuthRoutes from './routes/auth.route.js';
import UserRoutes from './routes/user.route.js'

app.use('/api/v1',AuthRoutes)
app.use('/api/v1/user',UserRoutes)

export {app};