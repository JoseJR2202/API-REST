export const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.send({
        status: 304,
        response: 'Hay una sesion abierta actualmente',
      });
    } else {
      next();
    }
  };
  
  export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.send({
        status: 400,
        response: 'Es necesario iniciar sesion primero',
      });
    }
  };
  