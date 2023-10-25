import { NextApiHandler } from 'next';

// ponto negativo de fazer desse traceDeprecation, não consigo tipar a resposta
const handle: NextApiHandler = (req, res) => {
  res.json({
    pong: true,
  });
};
export default handle;
