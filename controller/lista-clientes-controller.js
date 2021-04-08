import { clienteService } from '../service/cliente-service.js';
/*
Template
*/
const criaLinha = (nome, email, cpf, cep, cidade, estado, dataNasc, id) =>{
    const linhaNovoCliente = document.createElement('tr');
    const conteudo = `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>${cpf}</td>
    <td>${cep}</td>
    <td>${cidade}</td>
    <td>${estado}</td>
    <td>${dataNasc}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td>
    `
    linhaNovoCliente.dataset.id = id;
    linhaNovoCliente.innerHTML = conteudo;
    return linhaNovoCliente;
}

const tabela = document.querySelector('[data-tabela]');

tabela.addEventListener('click', async(event)=>{
    let botaoDeletar = event.target.className == "botao-simples botao-simples--excluir";
    if(botaoDeletar){
        try{
        const linhaCliente = event.target.closest('[data-id]');
        let id = linhaCliente.dataset.id;
        await clienteService.removeCliente(id)
        linhaCliente.remove();
        }
        catch(erro){
            console.log(erro);
            window.location.href = '../telas/erro.html'
        }
    }
})
const render = async () =>{
    try{
    const listaClientes = await clienteService.listaClientes()
        listaClientes.forEach(elemento =>{
        tabela.appendChild(criaLinha(elemento.nome, elemento.email, elemento.cpf, elemento.cep, elemento.cidade, elemento.estado, elemento.dataNasc, elemento.id));
    })        
    }
    catch(erro){
        console.log(erro);
        window.location.href = '../telas/erro.html'
    }

}

render();