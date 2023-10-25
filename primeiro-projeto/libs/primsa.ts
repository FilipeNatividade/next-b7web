import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined; //na hora que ela for criada ela é undefined, depoisela recebe prismaClient.
}

const prisma = global.prisma || new PrismaClient(); // aqui a const prisma receber a conexão de global caso ela não tenha essa conexão ela cria uma conexão

//agora eu preciso pegar essa conexão e jogar na minha variavel global, variavel de ambiente do .env. antes faço uma verificação para saber se esta em modo desenvolvimento ou produção, da seguinte maneira:

if (process.env.NODE_env !== 'production') {
  global.prisma = prisma;
}

// ai da proxima vez que esse codigo for acessado o meu global.prisma agora vai ter uma conexão, ai ele so reaproveita

export default prisma;
