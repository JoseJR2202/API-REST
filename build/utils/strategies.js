"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.JwtStrategy = exports.LocalStrategy = void 0;
const auth_helper_1 = require("@helpers/auth.helper");
const empleados_helper_1 = require("@helpers/empleados.helper");
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const jwt_simple_1 = require("jwt-simple");
const localOptions = {
    usernameField: 'correo',
    passwordField: 'contrasena',
};
const LocalStrategy = new passport_local_1.Strategy(localOptions, async (correo, contrasena, done) => {
    try {
        const user = await empleados_helper_1.getEmpleadosCorreo(correo);
        if (!user)
            return done(null, false);
        const isMatch = await auth_helper_1.comparePassword(contrasena, user.contrasena);
        console.log(isMatch);
        return isMatch ? done(null, { ...user, contrasena: undefined }) : done(null, false);
    }
    catch (e) {
        return done(null, false);
    }
});
exports.LocalStrategy = LocalStrategy;
const optJwt = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'tienda_moviles',
};
const JwtStrategy = new passport_jwt_1.Strategy(optJwt, async (payload, done) => {
    return done(null, payload.sub);
});
exports.JwtStrategy = JwtStrategy;
const generateToken = (user) => {
    const timestamp = new Date().getTime();
    return jwt_simple_1.encode({ sub: user, iat: timestamp }, process.env.JWT_SECRET || 'tienda_moviles');
};
exports.generateToken = generateToken;
//# sourceMappingURL=strategies.js.map