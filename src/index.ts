import './config/alias'
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { LocalStrategy, JwtStrategy } from '@utils/strategies';
import router from './routes'

const app = express();

app.set('port', process.env.PORT || 3000)

app.use(session({
	secret: process.env.SESSION_SECRET || 'clave',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

passport.use('jwt', JwtStrategy);
passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user: string, done) => {
  done(null, JSON.parse(user));
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
      origin: true,
      credentials: true,
      methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
      allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
    })
);

app.get('/', (req,res)=>{
    res.sendFile('../public/index.html', { root: __dirname });                               
})

//router
app.use('/',router);

app.use((req, res) => {
    res.status(404).send({'message': 'ERROR 404'});
});

app.listen(app.get('port'), ()=>{
	console.log('Server on port:', app.get('port'));
})
