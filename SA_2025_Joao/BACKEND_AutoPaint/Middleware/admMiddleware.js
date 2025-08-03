const autorizarAdmin = (req, res, next) => {
  if (req.usuario.tipo !== 'Admin') {
    return res.status(403).json({ erro: 'Acesso restrito a administradores.' });
  }
  next();
};
