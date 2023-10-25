fastRefresh:
    fast refresh é quando vc atualiza alguma coisa no código, modo de dev obviamente, e ele so atualiza o componente que foi mexido, como componente pode ser apenas um h1, ai em caso de mudar e querer saber o que mudar é necessário dar um refresh na página de fato

================================================================================

vriáveis de ambiente:
    nos temos 4 tipos de variaveis de ambiente:
        .env.local => lida por primeiro, ela refere-se a uma variavel para uma maquina em especial
        .env.developement => ela é lida por sengundo em questão de prioridade, como o nome diz ela serve para variaveis para o ambiente de desenvolvimento
        .env.production => lido por terceido por ordem de prioridades, e como o nome diz é variaveis para subir para produção
        .env => lida por ultimo em prioridade, e é geral, a ultima a ser lida, mas pode ser para local, desenvolvimento e produção

no next as variaveis de ambiente são privadas e publicas, que não precisa de nenhum prefixo, rodam em funçoes nativas como por exemplo o getStaticProps, e as publicas vc precisa por prefixo "NEXT_PUBLIC_NOME DA VARIAVEL"

================================================================================

scripts externos no next:
    o next tem um componente chamado Script, com letra maiuscula para diferenciar da tag html, onde tem a prop "strategy" onde vc informa quando vc quer que esse script seja lido, no exemplo estamos usando o google analytcs.

    código externo: um código que vc insere para rodar uma função externa, como por exemplo um chat algoi do tipo, no nosso exemplo estamos rodando o script, código do google analytcs, resumindo é um código/script externo add nas tags script, poderia ser a tag html, mas o next tem esse componente que nos ajuda a ter um resultado mais eficiente.

    opções que o strategy recebe:
        - beforeInteractive: carrega o script antes de qualquer código, mas após alguma hidratação da página
        - afterInteractive: (padrão) carrega o script mais cedo, mas após alguma hidratação
        - lazyOnload: carrega o script mais tarde durante o tempo de inatividade do navegador, pouco usado
        - worker: (experimental) carrega o script em um trabalhador web

    props, alem de strategy:
        - onLoad: executa um código depois que o script terminar de carregar
        - onReady: executa o código após o script terminar de carregar e toda vez que o componente estivar montado
        - inError: executa o código se o script falhar ao carregar

    opção de renderizar uma lista de códigos ou algo especifico no script, como por exemplo (aqui não precisa das outras props, so o strategy para saber mesmo a hora de rodar o código):
   
        <Script
            strategy="afterInteractive"
        >
            {`windo.alert('carreguei')`}
        </Script>

    com o script eu consigo rodar códigos especificos que eu precise rodar

================================================================================

hook useRouter:
    useRouter vem no next mesmo, tem como usar ele dessestruturado ( const { query } = useRouter() )

    vc pode usar por exemplo:
        - router.query: para pegar o nome do parametro que vc passou para a url, que vem de query string
        - router.pathname: que tras a rota, no caso da página sobre, trará "/sobre", sem a parte de https://localhost:3000, que é nosso cenario atual, e no caso onde temo um parametro na url, como slug, ele virá "/sobre/[slug]", com o nome literal do parametro
        - router.isFallback: ele retorna um true ou false, que pode ser usado para por um load enquanto carrega a página
        router.push(): que recebe tres parametros, o primeiro é obrigatorio, ele add a rota ao historico, podendo assim voltar para a pagina anterior
        - router.replace(): ele diferente do push, ele não adciona no historico, ele substitui a pagina anterior, (replace = substituir),
        por exemplo:
            estou na pagina /sobre/bonieky, quando for para /sobre/pedro, apertando em voltar el volta para a pagina /sobre, justamente por que substituiu a rota anterior

                exemplo:
                    <button onClick={() => {
                        // router.push('/sobre/pedro')
                        router.replace('/sobre/pedro')
                    }}>
                        Ir para página Pedro
                    </button>

        router.push e router.replace, podem ser usado de outra forma, uma maneira mais dinâmica:
            exemplo:
                 <button onClick={() => {
                    router.push({
                        pathname: `/sobre/[slug]`,
                        query: { slug: 'pedro' }
                    })
                }}>
                
                - eu coloco meu pathname e seto o valor que eu quero para o parametro, mandando o objeto montado

    route eventos:
        primeira coisa vc vai usar dentro do useEffect, onde vc roda eventos das rotas
            - router.events.on: vai ligar aquele evento
                (lembrando que sempre que usar o on eu preciso dar um off nele)
                -possui alguns eventos especificos:
                    - routeChangeStart: dispara quando uma rota começa a mudar
                    - routeChangeComplete:dispara quando uma rota muda completamente
                    - routeChangeError: dispara quando há um erro ao alterar rotas ou quando um carregamento de rota é cancelado
                        - err.cancelled: indica se a navegação foi cancelada
                    - beforeHistoryChange: dispara antes de alterar o histórico do navegador
                    - hashChangeStart: dispara quando o hash muda (baseado no que o routeChangeStart, acredito que seja quando o hash começa a mudar ), mas não a página
                    - hashChangeComplete: dispara quando o hash muda (baseado no que o routeChangeComplete, acredito que seja quando o hash mudar completamente), mas não a página

            - router.events.off:
                (o off desliga a função on, para que ele pare de monitorar a rota quando sair da pagina)

                exemplo de uso:
                      useEffect(() => {

                        ==================================================
                        exemplo de routeChangeError usando o err.cancelled
                            const handleRouteChangeError = (err, url) => {
                                if (err.cancelled) {
                                    console.log(`Route to ${url} was cancelled!`)
                                }
                            }
                        ==================================================

                        const handleRouteChange = (url: string) => {
                            console.log(`indo para ${url}`)
                        }


                        router.events.on('routeChangeComplete',handleRouteChange,)

                        return () => {
                            router.events.off('routeChangeComplete',handleRouteChange,)
                        }
                    }, [])

================================================================================

componente Link do next:
    qunado usamos o componente Link o comportamento para ir para a pagina muda completamente no next
        exemplo: quando usa a tag <a> é a msm coisa que ir na barra de navegação e digitar a url e dar enter, assim o navegador a página anterior e faz uma requicisao nova para api. usando o componente Link ele não faz isso, ele altera a url e não recarrega a pagina e carrega os comnponentes que ele precisa e mostra a pagina. usando um processo diferente, assim sendo se eu usar um state de outro componente eu não perco as informaçoes dele. um exemplo visual é que quando usa a tag <a> ele roda o botao de refresh, e quando usa o componente, como ele so carregas os componentes necessarios ele não recarrega a pagina, não mexe no botao de refresh

    quando o componente link é usado o next faz um procedimento chamdo "pré load"
        exemplo: ele pega o link que existe na tela e deixa pre carregado na memoria, para qunado o usuario clicar o navegador ja ter as informações dele, joga na tela e pronto, por isso é mais rapido

    como era obvio ele pode ser combinado com o route:
        <Link href=({
                    pathname: `/sobre/[slug]`,
                    query: { slug: 'pedro' }
                })>
                    ir para algum lugar
                </Link>

    possui outras props alem do href, props:
        - href: rota, que tem como padrão o push como ativo
        - replace: igual o route ele substitui o link pelo da página que vc foi, e nao da para voltar para a anterior, a diferença aqui é que ele recebe um true ou false, que por padrão ja vem com true
        - scroll: aqui se vc clica em um link que esta no final da página, quando ativa o link ai ele rola para o começo da página, recebe true ou false, por padrão vem como true
        - prefetch: por padrão vem como true. quando true, o next/link irá pré-buscar(pre fecth) a página (indicada polo href) em segundo plano. isto é util para m,elhorar o desempenho das navegações do lado do cliente. qualquer <Link> na janela de visualização (inicialmente ou através da rolagem) será pré-carregada
        - passHref: é usado quando se tem uma tag <a> dentro de um componente Link, pq as vezes dentro do componente <link> pode haver um componente mais extenso, criado pelo dev, ai vc colocando o passHref vc força o Link para enviar o href para o componente/tag filha. E por padrão ela vem como false, AH! fazendo com que o link/rota da url apareça la em baixo quando passar o mouse por cima


================================================================================

Estilização global no next.js:
    primeiro arquivo a ser carregado na sua página é o _app.tsx, e tudo que quiser fazer que seja aplicado na aplicação inteira, poe aqui tbm, no next se vc quiser fazer estilizações globais vc tem como importar so css, quando importa ele ja esta pronto para ser usado.
        - como fazer importação: import '@/styles/globals.css', acrescentado que para importar uma biblioteca do node-module, não precisa por node-module/blablabla, pode ser direto o nome da biblioteca e navegar dentro ate achar o arquivo dsejado

================================================================================

usando css modules no next.js:
    a nivel de scc de página, vc não pode criar o arquivo bla.module.css dentro da pasta página, se não vai ter a rota para o arquivo css, msm que o arquivo não seja lido pelo browser, o jeito certo é criar na pasta "style" um arquivo com o nome da página, nesse nosso caso, Sobre.module.css, sempre com letra maisucula, ai importar dentro do componente da pagina sobre e utilizar...diferente para componentes que estão na pasta components, que vc cria a pasta e dentro o index e o module.css. melhor opção componentizar tudo e por dentro do index da pagina necessaria. curiosidade, o .module.css fazs com o que na compilação ele altera o nome da classe, não no projeto mas no inspecionar do navegador...fazendo com que não tenha comflito com duas classes do msm nome em componentes diferente.

================================================================================

usando css-in-js no next:
    no next ele tem algo nativo que é abrir uma tag <style> que recebe uma prop jsx e dentro dela vc achar um par de chaves com um template strig e escreve os css normal la dentro, isso é chamado de css-in-js

    exemplo:
        <style jsx>
                {`
                    li{
                      background-color:#dedede  
                    }
                `}
            </style>
    
    temos uma outra prop dessa tag que coloca um estilo global, mas que vai funcionar so quando a pagina que tiver aberta tiver essa prop na tag, por exemplo se eu add o body no css do exemplo acima e mudar a cor do body ele não vai funcionar mas se eu quiser que na pagina X tenha o body de determinada cor por exemplo au add o global
    
    exemplo:
     <style global jsx>
                {`
                    body{
                      background-color:#dedede  
                    }
                `}
            </style>

    observação:
        se eu usar a prop global dentro de um componente botao customizado, em todas as telas/componentes que usarem esse botão vao ter o body, por exemplo, da cor adicionada no style

================================================================================

Montando layout unico:
    eu posso criar o layout, padrao de layout com header footers e tal... esse componente recebe um chidrem dentro do main por exemplo...ai eu vou no arquivo_app.tsx, pego o componente que é criado no npx crate next app e envolvo ele no meu layout, pq? para que ele sempre tenha o msm header e footer e o conteudo geral do site seja so o children que é o "Component". no react eu faço isso dentro do arquivo app na função app, esse é o equivalente...

    DESCONSIDERE A PARTE EM QUE DIZ PARA POR O <COMPONENTS> DENTRO DA TAG <LAYOUT>, PQ NÃO FUNCIONARÁ EM CASOS EM QUE NÃO É PARA EXIBIR O MENU POR EXEMPLO, COMO NO CASO DA TELA DE LOGIN

    a solução do Bonieky, add o layout em cada componente que é para aparecer, achei paia

================================================================================

usando next/head:
    dentro do next eu tenho uma tag chamada <Head>, ela serve para acessar o head do html, como se tivese no arquivo index.html msm, mas ela é dinamica eu posso por em qual componente eu quiser, fazendo com que ela mude de pagina para pagina, por exemplo...e como disse, ela é dinamica, entao eu posso por o valor de algum state ou informações de um link dinamico, nesse caso por exemplo pode ser bonieky da pagina sobre. ela pode ser colocada dentro de qualquer parte do return do componente.

        props:
            - title: titulo da pagina, o que aparece do lado do fivicon
            - meta: por exemplo o nome da description do site
            - link: por exemplo link do fiviicon

================================================================================

Exibindo arquivos estáticos:
    arquivos que estáo dentro da pasta public são arquivos estaticos...nunca por um arquivo dentro de public com o mesmo nome de uma arquivo de dentro da pasta page, se não vai dar conflito de rotas. os arquivos da pasta public só ficam disponivel na hora do public. nunca add arquivo dentro dessa pasta enquanto o sistema estiver rodando, se não vc tem que parar a aplicação e rodar novamente.
    Quando for usar uma imagem de dentro da pasta public ou qualquer arquivo do public, só por o nome do arquivo, não precisa ir andando dentro de pasta por pasta ate voltar na pasta public.

================================================================================

Usando o Image Optimization do next.js:
    diferente da tag img, a tag image, vc precisa importar a imagem da pasta public, para que na hora do build o next ja deixa a imagem "organizada" ja sabe os tamanhos de imagens que precisa e tal deixando elas pre-processadas, para o next saber seu tamanho original, os tamanhos que vão ser usados na aplicação os lugares onde vão e tal.
        - diferente de como ia o src na tag img que so colocava o nome do arquivo, precisa ser importado a imagem navegando pelas paginas ate a pagina public
        - para imagens externas eu preciso obrigatoriamente o width e o height da imagem, pq como é externa o next não tem acesso as medias originais da imagem
        - detalhe importante, eu preciso ir no next.config eu preciso liberar o0 dominio da imagem remota/externa, exemplo a baixo:
            /** @type {import('next').NextConfig} */
            const nextConfig = {
            reactStrictMode: true,
            domains: ['www.google.com.br'],
            };

            module.exports = nextConfig;

================================================================================

SEO com nextjs (estático e dinâmico):
    - estático: site "metatags.io" site que gera tags para vc por no site. Nesse site vc põe as informações necessarias e vai em generate meta teg, ele gera um codigo html para vc colar na sua aplicação. no caso de next eu coloco as informações dentro do componente nativo <Head>

    - dinâmica: aqui pelo menos, para afins de estudo, to copiando o head que gerei la no site e colei na pagina estatica,mas mudarei todas as informações, estou fazendo isso no [id] do blog, como exemplo de pagina dinamica.
        aqui por um exemplo que da pra passar variaveis para as metas:
               <meta name="title" content={post.title} />
        na questão da url eu posso está montando a url, por exemplo:
             <meta property="og:url" content={`https://localhost:3000//blog/${post.id}`} />

================================================================================

criando api simples:
    a estrutura de paginas é a msm que da pasta page para acesar, quero um api users, eu vou la dentro de api e crio uma pasta chamda users

================================================================================

Lidando com o CORS com next:
    cors é uma proteção que todo dispositivo que acessa a api tem, ele serve para proteger sua api de ser acessado por qualquer outro dispositivo, robos e tal...isso evita que pessoas que vc não quer que acesse consigam acessar ou dizer o que aquela pessoa pode acessar ou como ela pode acesar, erro de cors erro de externo tentando acessar a sua api.
    - a api por padrao não pode ser acessada por externos, mas o next tem uma maneira nativa de resolver isso, indo no next.config. Exemplos:
        /** @type {import('next').NextConfig} */
        const nextConfig = {
        reactStrictMode: true,
        images: {
            domains: ['www.google.com.br'],
        },
        headers: async () =>{
            return [{
            source: '/api/:path*',
            headers:[
                {
                key:'Access-Control-Allow-Origin', value:'*'
                },
                {  
                key:'Access-Control-Allow-Methods', value:'GET,POST,DELETE'
                }
            ]
            }]
        }
        };

module.exports = nextConfig;


        - aqui no caso eu estou liberando todos os endpoints... caso contrario eu coloco o link de endpoint por endpoint
        - ele retorna um array pq é um conjunto de regras
        - ai dou o acesso para sites externos por exemplo usando  key:'Access-Control-Allow-Origin', value:'*', o * diz que pode ser liberado para todo mundo, ou passo só os sites que tem acesso a essa api
        - e tbm tem como eu limitar o tipo de requisição externa que eu aceito, dessa maneira  key:'Access-Control-Allow-Methods', value:'GET,POST,DELETE'
        - posso está criando um objeto de regras para cada api tbm:
            return [
               {
                    source: '/api/:path*',
                    headers:[
                        {
                            key:'Access-Control-Allow-Origin', value:'*'
                        },
                        {  
                            key:'Access-Control-Allow-Methods', value:'GET,OST,DELETE'
                        }
                    ]
                },
                {
                    source: '/api/users',
                    regras
                },
            ]

================================================================================

query string:
    quando eu vou começar a quary eu coloco um "?" logo apos terminar de escrever a url, ai quer dizer que esta aberto a receber as informações, entao eu coloco uma chave e um valor e separo por "&", cada vez que tiver um & comercial quer dizer que vai ser add uma a chave e um valor novo no objeto queri que o back recebe...
        url?id=2&nome=tste => exemplo
    mas se eu precisar receber um array pela query, por exemplo, chave carro, valor array com varios nome de carro
        url?carro=carro1&carro=carro2... => assim que se manda um aray por query 


    quando quero receber informações da query eu  uso o req.query e para receber informações do body ey acesso req.body

    mas geralmente é só pelo query ou só body, em caso de post, diferente de um put por exemplo

================================================================================

status das requisições:
    poe padão ele retorna status 200, mas tem como vc por o codigo que vc quer conforme sua necessidade,por exemplo:
        res.status(200).json(Users)

================================================================================

instrução a ORM e prisma:
    ORM = obect-relational Mapping => mapeamento de objeto relacional
    orm é uma tecnica, que é a tecnica que oprisma usa essa tecnica, orm é quando cria via codigo um reflexo do da estrutura do banco, um codigo que mapeia, reflete o que esta acontecendo no banco de dados, relacionar um objeto do banco de dados no codigo

    BANCO DE DADOS:
        - users
        -- id
        -- name
        -- email

    OBJETO:
        let user = {
            id:1,
            name:'Bonieky',
            email: email@email.com.br
        }

    tenho um objeto que possui a mesma istrutura do meu banco de dados, isso é quando se faz o mapeamento, o prisma cria um objeto que esse objeto reflete o banco de dados, quando quero add um novo usuario no banco de dados, eu não add no banco de dados eu add o objeto ai o prisma ve que foi criado um objeto novo,joga no banco de dados, mapeia para la, sincronizando com obanco de dados, criando esse usuario. Peguei um usuario ai ele vai no pega os dados do usuario e joga esses dados em um objeto, e ai esse objeto tem os dados que tem no banco de dados, mudando o nome de um usuario e salvo, ele pega os dados atualizados e reflete no banco de dados e atualiza as informações. a Interação com banco de dados qm faz é o prisma, ai nos trabalhamos so com codigos, isso é  a tecnica ORM.

================================================================================

Configurando o prisma:
    primeiro passo - fazer a instalação 
        npm i -D prisma
        npm i @prisma/client

    segundo passo - comando npx prisma init:
        ai o prisma cria uma pasta e um .env que posui uma url, em uma variavel de ambiente, que ai entao eu vou la e altero com as informações necessarias para acessar meu banco de dados, nssa url eu colo usuario do postgres, que é o banco que to usando, senha, nome do banco de dados.
    
    terceiro passo - comando npx prisma generate:
        esse comando basicamente vai gerar, criar, um codigo que esse codigo vai ser o objeto que a gente precisa de acordo com o banco de dados que a gente tem. Uma vez que eu criei uma estrutura de banco de dados, seja por codigo ou direto no banco, ai eu vou e dou o comando npx prisma generate, e sempre que fizer uma alteração no banco de dados eu preciso gerar um novo codigo do prisma, e para isso eu rodo esse comando. 

    quarto e ultimo passo:
        criar um codigo que tenha a instancia do nosso prisma, por consequencia a instancia de conexão com nosso banco de dados.
        na minha pasta "utils" ou uma pasta chamada "libs", no exemplo da aula está sendo criado uma pasta "libs" e dentro dela crio um arquivo chamado "prisma.ts". quando nos importarmo esse arquivo automaticamente nos estaremos importando toda a estrutura do prisma, junto disso a minha conexão com banco de dados. entao qualquer lugar que eu for fazer alguma coisa no banco de dados eu importo esse arquivos e pronto, ele vai ter acesso ao banco de dados e eu posso fazer o que quiser.
            - dentro desse arquivo eu impor "import { PrismaClient } from '@prisma/client';"
            - quando eu tiver criado alguma estrutura de banco de dados, esse import, "PrismaClient", ele ja vai ter essa estrutura pronta.

        PROBLEMA! quando o next esta rodando o next em modo desenvolvedor, isso significa que ele fica la rodando e monitorando meus codigos, sempre que eu altero algum codigo e salvo o proprio next ja identifica que houve aquela modificação e ja regera esse arquivo pra mim, entao isso quando eu to trabalhando com conexão ao banco de dados nos vamos fazer a instancia de conexão de  de dados, do meu prisma, entao quando eu faço isso ele cria uma nova conexão com o banco de dados, se eu simplesmente faço aqui um codigo para ele criar uma conexão toda vez que eu alterar algum codigo entquanto meu modo desenvolvedor tiver rodando ele vai gerar de novo, gerou de novo, gera outra conexão e assim por diante, então isso pode ocasionar um erro de limite de conexão com banco de dados. Para evitar esse problema nos fazemos:
            solução: quando a gente não tiver em modo produção nos vamos reaproveitar essa conexão usando uma variavel global, essa variavel enquanto o sistema tiver rodando ela vai ficar e se manter com esses dados.
                aqui vai haver uma separação para usar so qunado estiver em modo desenvolvedor, quando ele tiver em produção ele não precisa disso.
                    declare global {
                        let prisma: PrismaClient | undefined; //na hora que ela for criada ela é undefined, depoisela recebe prismaClient.
                    }

                    const prisma = global.prisma || new PrismaClient(); // aqui a const prisma receber a conexão de global caso ela não tenha essa conexão ela cria uma conexão

                    //agora eu preciso pegar essa conexão e jogar na minha variavel global, variavel de ambiente do .env. antes faço uma verificação para saber se esta em modo desenvolvimento ou produção, da seguinte maneira:

                    if(process.env.NODE_env !== 'production'){
                        global.prisma = prisma
                    }

                    // ai da proxima vez que esse codigo for acessado o meu global.prisma agora vai ter uma conexão, ai ele so reaproveita

                    export default prisma

            agora só vou executar esse codigo que faz conexão com o banco de dados quando rodar o npm run dev, então toda vez que rodar o npm dev eu faço uma conexão no banco de dados.

================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
================================================================================
