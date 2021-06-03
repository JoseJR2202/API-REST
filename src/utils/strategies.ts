import { comparePassword } from '@helpers/auth';
import {getEmpleados_correo} from '@helpers/Empleos'
import { Strategy as Local } from 'passport-local';
import { Strategy as JWT, ExtractJwt } from 'passport-jwt';
import { encode } from 'jwt-simple';

const localOptions = {
  usernameField: 'correo',
  passwordField: 'contrasena',
};

const LocalStrategy = new Local(localOptions, async (correo, contrasena, done) => {
  try {
    const user = await getEmpleados_correo(correo);
    if (!user) return done(null, false);
    const isMatch = await comparePassword(contrasena, user.contrasena);
    console.log(isMatch)
    return isMatch ? done(null, { ...user, contrasena: undefined }) : done(null, false);
  } catch (e) {
    return done(null, false);
  }
});

const optJwt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'tienda_moviles',
};

const JwtStrategy = new JWT(optJwt, async (payload, done) => {
  return done(null, payload.sub);
});

const generateToken = (user: any) => {
  const timestamp = new Date().getTime();
  return encode({ sub: user, iat: timestamp }, process.env.JWT_SECRET || 'tienda_moviles');
};

export { LocalStrategy, JwtStrategy, generateToken };
