import { clienteService } from "../service/cliente-service.js";

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', async (event)=>{

    event.preventDefault();
    try{
    const nome = event.target.querySelector('[data-tipo="nome"]').value;
    const email = event.target.querySelector('[data-tipo="email"]').value;
    const cpf = event.target.querySelector('[data-tipo="cpf"]').value;
    const cep = event.target.querySelector('[data-tipo="cep"]').value;
    const cidade = event.target.querySelector('[data-tipo="cidade"]').value;
    const estado = event.target.querySelector('[data-tipo="estado"]').value;
    const dataNasc = event.target.querySelector('[data-tipo="dataNasc"]').value;

    await clienteService.criaCliente(nome, email, cpf, cep, cidade, estado, dataNasc)    
    window.location.href = '../telas/cadastro_concluido.html';
    }
    catch(erro){
        window.location.href = '../telas/erro.html';
        console.log(erro);
        
    }
})