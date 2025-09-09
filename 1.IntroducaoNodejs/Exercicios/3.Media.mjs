import * as http from 'http'
import * as url from 'url'

const servidor = http.createServer();

servidor.on('request', (req,res)=> {
    if (req.url.startsWith('/resultado'))
        paginaResultado(req, res);
    else{
        paginaFormulario(req, res);
    }    
});
servidor.listen(8000, '127.0.0.1');
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");

function paginaFormulario(req,res){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.end(
       `<html>
            <head>
                <meta charset="UTF-8">
                <title>formulario</title>
            </head>
            <body>
                <h4>Informe os números abaixo para o aplicativo poder calcular a média</h4>
                <form action="/resultado" method="get">
                <p><label for="numero">Número 1: </label></p> 
                <p><input type="number" name="n1" id="n1"></p>
                <p><label for="numero">Número 2: </label></p> 
                <p><input type="number" name="n2" id="n2"></p>
                <p><label for="numero">Número 3: </label></p> 
                <p><input type="number" name="n3" id="n3"></p>
                <button type="submit">Enviar</button>
                </form>
            </body>
        </html>`
    );
}function paginaResultado(req,res){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    
    let parametros = new url.URLSearchParams(req.url);

    var n1 = parseInt(parametros.get('/resultado?n1'));
    var n2 = parseInt(parametros.get('n2'));
    var n3 = parseInt(parametros.get('n3'));

    var media = (n1 + n2 + n3)/3;
    res.end(
        `<html>
            <head>
                <meta charset="UTF-8">
                <title>formulario</title>
            </head>
            <body>
                <h2>Resultado da Operação</h2>
                <h5>Média dos 3 números:` + media + `</h5>
            </body>
        </html>`
    )

}