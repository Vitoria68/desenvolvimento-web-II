import * as http from 'http'

const servidor = http.createServer();
const data_atual = new Date(Date.now());
const data_formada = data_atual.toLocaleDateString();
const hora_formada = data_atual.toLocaleTimeString();

servidor.on('request', (req, res) => {
    if(req.url === '/')
        paginaPrincipal(req, res)
    else if(req.url === '/data')
        paginaData(req, res);
    else if(req.url === '/hora')
        paginaHora(req,res);
    else if(req.url == '/datahora')
        paginaDataHora(req,res);
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain'});
    res.end("Não foi possível acessar o caminho: "+ req.url);
   }
});

servidor.listen(8000, '127.0.0.1');
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");

function paginaPrincipal(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(
        `<html>
            <head>  <meta charset="UTF-8">
            <title> Aplicação Data/Hora </title>
            </head>
            <body>
                <h2> Aplicação Data/Hora</h2>
                <h4> Aqui é possível consulta a data e/ou hora atual </h4>
                <p><a href='/data'> Consultar a Data Atual</a></p>
                <p><a href='/hora'> Consultar a Hora Atual</a></p>
                <p><a href='/datahora'> Consultar a Data e Hora Atual</a></p>
            </body>
        </html>

            `
    );
}
function paginaData(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(
        `<html>
            <head> 
                <meta charset="UTF-8">
                <title> Data Atual</title>
            </head>
        <body>
            <p> Página para exibir a data atual</p>
            <p>Data Atual: `+data_formada+ ` </p>
            <p><a href='/'> Voltar</a></p>           
        </body>
    </html>`

    );
}

function paginaHora(req,res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(
        `<html>
            <head> 
                <meta charset="UTF-8">
                <title> Hora Atual</title>
            </head>
        <body>
            <p> Página para exibir a hora atual</p>
            <p>Data atual: `+hora_formada+` </p>
            <p><a href='/'> Voltar</a></p>          
        </body>
    </html>`

    );
}
function paginaDataHora(req,res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(
        `<html>
            <head> 
                <meta charset="UTF-8">
                <title> Data e Hora Atual</title>
            </head>
        <body>
            <p> Página para exibir a data e hora atual</p>
            <p>Data e Hora  atual: `+data_formada+`  -  `+hora_formada+` </p>
            <p><a href='/'> Voltar</a></p>           
        </body>
    </html>`

    );
}