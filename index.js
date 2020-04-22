const restify = require("restify");
const server = restify.createServer();
const Carro = require("./models/carro");
const { Op } = require("sequelize");

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


const CARRO = '/ec021/carro';

server.post(`${CARRO}`, async (req, res) => {
    let marca = req.body.marca;
    let modelo = req.body.modelo;
    let ano = req.body.ano;
    let valor = req.body.valor;
    let carro = await Carro.create(
        {
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor 
        }
    );

    let carroCriado = await Carro.findByPk(carro.id);

    res.json(carroCriado);
});

server.patch(`${CARRO}/:id`, async (req, res) => {
    let id = req.params.id;
    let marca = req.body.marca;
    let modelo = req.body.modelo;
    let ano = req.body.ano;
    let valor = req.body.valor;

    let carro = await Carro.update(
        {
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor 
        },
        {
            where: { id: id }
        }
    );

    let carroAtualizado = await Carro.findByPk(id);

    res.json(carroAtualizado);
});

server.get(`${CARRO}`, async (req, res) => {
    let id = req.query.id;
    let marca = req.query.marca;
    let modelo = req.query.modelo;
    let ano = req.query.ano;
    let valor = req.query.valor;

    if(id){
        let carros = await Carro.findByPk(id);
        res.json(carros);

    }else if(marca){
        let carros = await Carro.findAll(
            {
                where: { marca: marca }
            }
        );
        res.json(carros);

    }else if(marca && modelo){
        let carros = await Carro.findAll(
            {
                where: { marca: marca, modelo: modelo}
            }
        );
        res.json(carros);

    }else if(ano){
        let carros = await Carro.findAll(
            {
                where: { ano: {[Op.gte]: ano }}
            }
        );
        res.json(carros);

    }else if(valor){
        let carros = await Carro.findAll(
            {
                where: { valor: {[Op.gte]: valor }}
            }
        );
        res.json(carros);

    }else{
        let carros = await Carro.findAll();
        res.json(carros);
    }
});

server.del(`${CARRO}/:id`, async (req, res) => {
    let id = req.params.id;

    let nExcluidos = await Carro.destroy(
        {
            where: { id: id }
        }
    );

    res.json(
        {
            Excluidos: nExcluidos
        }
    );
});

server.listen(3000, function(){
    console.log("O servidor esta rodando!");
});