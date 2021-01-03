exports.Ping = (req, res) => {
  res.status(200).json({
    resposta: 'Servidor operando normalmente...',
  });
};
