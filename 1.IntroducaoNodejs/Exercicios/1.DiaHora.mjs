import * as http from 'http'

const servidor = http.createServer();

const data_atual = new Date(Date.now());
//retorna String com data formatada 
const data_formatada = data_atual.toLocaleDateString();

//configura a função que irá tratar as requisições http
servidor.on('request', (req, res) => {
//prepara o cabeçalho da resposta
res.writeHead(200, { 'Content-Type': 'text/html' });


var resposta = 
 `<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <h3>Página para exibir a data atualizada.</h3>
        <p>Data atual: ` + data_formatada + `</p>
    </body>
    </html>`

    res.write(resposta);
    res.end();

});
servidor.listen(8000, "127.0.0.1");
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");



