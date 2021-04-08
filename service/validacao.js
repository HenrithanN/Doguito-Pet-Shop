export function valida(input){
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemErro
        (tipoDeInput, input);
    }
}
/*
Variavel de Mensagens de Erro
*/
const mensagensErro = {
    nome:{
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email:{
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O Email digitado não é válido.'
    },
    dataNascimento:{
        valueMissing: 'O campo data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar.'
    },  
    cpf:{
        valueMissing: 'O campo CPF não pode estar vazio.'
    },
    cep:{
        valueMissing: 'O Campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possivel encontrar o CEP.'
    },
    cidade:{
        valueMissing: 'O Campo de cidade não pode estar vazio.'
    },
    estado:{
        valueMissing: 'O Campo de estado não pode estar vazio.'
    }
}
/*
Variavel de Tipos de Erro
*/
const tipoDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]
/*
Variavel com os Validadores
*/
const validadores = {
    dataNascimento: input => validaDataNasc(input),
    cep: input => recuperarCEP(input)
}
/*
Funcao para Mostrar mensagens de erro.
*/
function mostraMensagemErro(tipoDeInput, input){
    let mensagem = '';

    tipoDeErro.forEach(erro =>{
        if(input.validity[erro]){
            mensagem = mensagensErro[tipoDeInput][erro];
        }
    })
    return mensagem;
}
/*
Funcoes para Validacao de Data de Nascimento
*/
function validaDataNasc(input){
    const dataRecebida = new Date(input.value);
    let mensagem = '';
    
    if(!maiorQue18(dataRecebida)){
        mensagem = 'Voce deve ser Maior que 18 Anos para se Cadastrar.';
    }

    input.setCustomValidity(mensagem);
}

function maiorQue18(data){
    const dataAtual = new Date();
    const dataMaiorDe18 = new Date(data.getUTCFullYear() + 18,data.getUTCMonth(), data.getUTCDate());

    return dataMaiorDe18 <= dataAtual;
}
/*
Funcao para recuperar o CEP
*/

function recuperarCEP(input){
    const cep = input.value.replace(/\D/g,'');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers:{
            'content-type':'application/json;charset=utf-8'
        }
    };

    if(!input.validity.patternMismatch && !input.validity.valueMissing){
        fetch(url,options).then(
            response => response.json()
        ).then(
            data =>{
                if (data.erro){
                    input.setCustomValidity('Não foi possivel encontrar o CEP.');
                    return;
                }
                input.setCustomValidity('');
                preencherCamposCEP(data);
                return;
            }
        )
    }
}

function preencherCamposCEP(data){
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    cidade.value = data.localidade;
    estado.value = data.uf;
}