import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url'

const servidor = http.createServer();

servidor.on("request", (req,res) => {

    if(req.url.startsWith('/resultado')) {
        let parametros = new url.URLSearchParams(req.url);
        var nota1 = parseFloat(parametros.get('/resultado?n1'))
        var nota2 = parseFloat(parametros.get('n2'))
        var nota3 = parseFloat(parametros.get('n3'))
        var nota4 = parseFloat(parametros.get('n4'))    

        var media = (nota1 + nota2 + nota3 + nota4)/4
        

        

        if(parseFloat(media) >= 6) {
            paginaAprovado(req, res);
        } else {
            paginaReprovado(req, res);
        }

    } else if(req.url.startsWith('/'))
        paginaFormulario(req,res);
    else {
        res.writeHead(404, {"Content-Type" : "text/plain; charset=utf-8"});

        res.end("Não foi possível acessar o caminho: " +req.url)
    }

});

//configura o endereço e porta do servidor e ativa o servidor
servidor.listen(8000, '127.0.0.1');
//exibe uma mensagem informado que o servidor está pronto
console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");

function paginaFormulario(req,res){
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    try{
        const html = fs.readFileSync('./html/formulario.html');
        res.write(html)
        res.end();
    } catch (erro) {
        console.error("Houve o seguinte erro ao tentar acessar o arquivo: "+ erro);
    } 
}

function paginaReprovado(req,res){
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    try{
        const html = fs.readFileSync('./html/reprovado.html');
        res.write(html)
        res.end();
    } catch (erro) {
        console.error("Houve o seguinte erro ao tentar acessar o arquivo: "+ erro);
    } 
}

function paginaAprovado(req,res){
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    try{
        const html = fs.readFileSync('./html/aprovado.html');
        res.write(html)
        res.end();
    } catch (erro) {
        console.error("Houve o seguinte erro ao tentar acessar o arquivo: "+ erro);
    } 
}