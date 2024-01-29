export class ServicoPrestado {
    descricao: String;
    valor: String;
    data: String;
    idCliente: String;
    cliente: {
        id: number;
        nome: string;
    };
}