// importa o módulo http para processar requisições http
import * as http from 'http'
// importa o módulo url para tratamento das informações da URL
import * as url from 'url'

//cria o servidor http
const servidor = http.createServer();

//configura a função que irá tratar as requisições http
servidor.on('request', (req, res) => {
    if (req.url.startsWith('/formulario')) //requisição página "Formulário"
        paginaFormulario(req, res);
    else if (req.url.startsWith('/pedido')) //requisição página que irá processar o pedido, via formulário
        paginaPedido(req, res);
    else {
        paginaPrincipal(req, res)   
    }
});

//configura o endereço e porta do servidor e ativa o servidor
servidor.listen(8000, '127.0.0.1');
//exibe uma mensagem informado que o servidor está pronto
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");

function paginaPrincipal(req, res) {
    //prepara o cabeçalho da resposta
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //chama a função que finaliza a conexão, enviando a resposta
    res.end(
        `<html>
            <head>
                <meta charset="UTF-8">
                <title>Página Principal</title>
            </head>
            <body>
                <h1>Exemplo Node.js com mais de uma página.</h1>
                <p>Acesse o Formulário de Pedidos <a href='/formulario'>aqui</a></p>
            </body>
         </html>`
    );
}
function paginaFormulario(req, res) {
    //prepara o cabeçalho da resposta
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    //chama a função que finaliza a conexão, enviando a resposta
    res.end(
        `<html>
            <head>
                <meta charset="UTF-8" />
                <title>Formulário</title>
            </head>
            <body>
            <form action="/pedido" method="get">
                <label for="nome">Nome</label>
                <input type="text" name="nome" id="nome">
                <label for="produto">Produto</label>
                <input type="text" name="produto" id="produto">
                <label for="qtd">Quantidade</label>
                <input type="number" name="qtd" id="qtd">
                <button type="submit">Enviar</button>
            </form>
            </body>
        </html>`
    );
}
function paginaPedido(req, res) {
    //prepara o cabeçalho da resposta
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    //processando os dados que foram enviados via método GET
    let parametros = new url.URLSearchParams(req.url);

    var nome = parametros.get('/pedido?nome')
    var produto = parametros.get('produto')
    var qtd = parseInt(parametros.get('qtd'))

    if( parseInt(qtd) < 0 )
        res.end(nome + ", você informou uma quantidade de produtos incorreta, favor fazer a requisição novamente.")
    else
        res.end(nome + ", o seu pedido para " + qtd + " item(ns) do produto '" + produto + "' será processado.")
    }