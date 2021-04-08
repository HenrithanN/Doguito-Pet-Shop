import {clienteService} from '../service/cliente-service.js';

( async ()=>{
    const buscarUrl = new URL(window.location);

    const id = buscarUrl.searchParams.get('id');    
    
    const inputNome = document.querySelector('[data-tipo="nome"]');
    const inputEmail = document.querySelector('[data-tipo="email"]');
    const inputCpf = document.querySelector('[data-tipo="cpf"]');
    const inputCep = document.querySelector('[data-tipo="cep"]');
    const inputCidade = document.querySelector('[data-tipo="cidade"]');
    const inputEstado = document.querySelector('[data-tipo="estado"]');
    const inputDataNasc = document.querySelector('[data-tipo="dataNasc"]');
    try{
    const dados = await clienteService.detalhesCliente(id)
        inputNome.value = dados.nome
        inputEmail.value = dados.email
        inputCpf.value = dados.cpf 
        inputCep.value = dados.cep 
        inputCidade.value = dados.cidade 
        inputEstado.value = dados.estado
        inputDataNasc.value = dados.dataNasc
    }
    catch(erro){
        console.log(erro);
        window.location.href = '../telas/erro.html'
    }
    const formulario = document.querySelector('[data-form]');
    
    formulario.addEventListener('submit', async (event)=>{
        event.preventDefault();
        try{
        await clienteService.atualizaCliente(id,inputNome.value, inputEmail.value, inputCpf.value, inputCep.value, inputCidade.value, inputEstado.value, inputDataNasc.value)
        window.location.href = '../telas/edicao_concluida.html';                     
        }
        catch(erro){
            console.log(erro);
            window.location.href = '../telas/erro.html';
        }
    
    })
})()
