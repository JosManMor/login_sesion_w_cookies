import express from 'express';
import { PORT, IP, CORS_ORIGIN, SESSION_SECRET } from './config.js';
import bodyParser from 'body-parser';
import { bodyErrorHandling } from './middleware/bodyErrorHandling.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import authRoutes from './routes/auth.routes.js';
import morgan from 'morgan';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(morgan('dev'));
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'views', 'index.html'));
});

app.get('/protected', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'views', 'protected.html'));
});

app.use('/auth',authRoutes);
app.use(bodyErrorHandling);

app.listen(PORT, IP, () => console.log(`iniciado en http://${IP}:${PORT}`));
