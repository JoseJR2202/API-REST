const express = require('express');
const path= require('path');
const multer  = require('multer')
const upload = multer()
const passport= require('passport')
const session= require('express-session')
const cors=  require('cors');

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
    res.sendFile('./public/index.html', { root: __dirname });                               
})

//router

app.use((req, res) => {
    res.status(404).send({'message': 'Errorrrrr 404'});
});

app.listen(app.get('port'), ()=>{
	console.log('Server on port:', app.get('port'));
})