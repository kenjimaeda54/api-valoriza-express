// vou subscrever a tipagem do express
// precisa fazer mesmo diretorio para garantir nao dar erro
// depois ir ate o tsconfig.json e mudar o diretorio de raiz para src
//typeRoots: ["./src/@types"]
// @types
//   |
//   | express
//        |
//        | index.d.ts

declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
