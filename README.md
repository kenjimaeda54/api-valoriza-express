## Api valoriza

Api em Express com SqlLite e TypeOrm

## Motivações

Criar api para cadastros de elogios. </br>
Administrador pode gera as tags dos elogios é as pessoas podem enviar seus elogios ou receber.

## Features

- Usei o typeOrm para lidar com o banco de dados.
- TypeOrm é  uma ORM para facilitar escrita de consulta do banco.
- Abaixo substitui o comando SELECT \* FROM tags WHERE name = 'name' usanod findOne
- Trabalhei com a ideia dos token, exemplo abaixo setei o subject com id do usuario, depois recupero,pela desestruturação do sub e seto na request
- Sing é  uma funcao do jswToken para setar nosso token,ele precisa de pelo menos 3 parametros nosso payload,chave secreta e o tempo de expiracao,tambem posso usar o subject para compartilhar os dados que desejo
- Verify é  uma funcao do jswToken para verificar se o token esta correto,
  ele espera pelo menos dois parametros o token em si e a chave secreta

```typescript
class StoreTags {
  async store(name: string) {
    const tagsRepository = getCustomRepository(TagRepository);
    if (!name) {
      throw new Error("Name is required or invalid");
    }
    //se houve mais dois parametros para procurar precisaria do where
    //SELECT * FROM tags WHERE name = 'name'
    const tag = await tagsRepository.findOne({
      name,
    });
    if (tag) {
      throw new Error("Tag already exists");
    }
    const newTag = tagsRepository.create({ name });
    await tagsRepository.save(newTag);
    return newTag;
  }
}

//ele espera um objeto no primeiro parametro nao aceita
//string
class AuthenticationUser {
  async storeAuthUser({ email, password }: IAuthenticationUser) {
    const userRepository = getCustomRepository(UserRepositores);
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new Error("Email/password incorrect");
    }
    const passwordCorrect = await compare(password, user.password);
    if (!passwordCorrect) {
      throw new Error("Email/password incorrect");
    }
    //ele espera um objeto no primeiro parametro nao aceita
    //string
    const token = sign({ email }, process.env.TOKEN_SECRET, {
      //qual informacoes quero passar para subject,no cao o id do usuario
      //depois consigo recuperar chamando campo {sub}
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return token;
  }
}

//recuperando o token e setando no request
export default function MiddlewareEnsureLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).send({
      message: "No token provided",
    });
  }
  //aplicando destruction
  const [, token] = auth.split(" ");

  //verifica se o token esta correto
  //try e catch e para garantir possiveis erros
  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload;
    //pegando o id
    //e setando n request
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid token or token expired",
    });
  }
}
```

##

- Para retornar apenas os valores que desejo do find no typeOrm utilizo o select
- Relations é  a relação das minhas entidades,assim consigo retornar o objeto que faz relação aos elogios.
- Relação e de Muitos para um. Um usuario pode ter muitos elogios,mas nao posso ter elogios sem usuarios.
- O campo joinColumn precisa ser identico a da relacao.

```typescript
class ComplimentsUserSend {
  async showComplimentsUserSend(userId: string) {
    const repository = getCustomRepository(ComplimentsRepositories);
    return await repository.find({
      select: ["id", "user_receiver", "user_sender", "message"],
      where: {
        user_sender: userId,
      },
      relations: ["tagId", "userReceiver"],
    });
  }
}

// entidades

@Entity("compliments")
class Compliments {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: "user_sender" })
  //posso ter muito comentarios para um usuario
  @ManyToOne(() => User)
  userSender: User;

  @Column()
  user_receiver: string;

  //usando joinColumn  vai retornar todos os campos do usuario que recebeu o elogio
  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  userReceiver: User;

  @Column()
  tag_id: string;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tags)
  tagId: Tags;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
```

##

- Sobrescrevi as tipagens do express
- Para isto precisa seguir mesmo estrutura de diretorios da lib express
- Precisa reparar qual nomenclatura eles utilizam para tipa aqui era declare nameEspace
- Express e o nome da lib é a interface que desejo nomear no caso a Request
- Precisa tambem apontar o diretorio que esta a pasta de tipagens

```typeScript
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


//tsConfig

  "typeRoots": [
      "./src/@types"
    ] /* Spe

```

## Como iniciar?

- Clone o projeto e instale as depedencias com yarn install ou npm install.
- Depois yarn run dev ou npm run dev
