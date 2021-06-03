"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.isLogged = void 0;
exports.isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send({
            status: 304,
            response: 'Hay una sesion abierta actualmente',
        });
    }
    else {
        next();
    }
};
exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({
            status: 400,
            response: 'Es necesario iniciar sesion primero',
        });
    }
};
//# sourceMappingURL=auth.js.map