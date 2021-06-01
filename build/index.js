"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.use(express_session_1.default({
    secret: process.env.SESSION_SECRET || 'clave',
    resave: true,
    saveUninitialized: true
}));
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(cors_1.default({
    origin: true,
    credentials: true,
    methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
    allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
}));
app.get('/', (req, res) => {
    res.sendFile('../public/index.html', { root: __dirname });
});
//router
app.use((req, res) => {
    res.status(404).send({ 'message': 'Errorrrrr 404' });
});
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});
//# sourceMappingURL=index.js.map