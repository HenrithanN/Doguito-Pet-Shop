const listaClientes = () =>{
    return fetch(`http://localhost:3000/profile`)
    .then( response =>{
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error ('Não foi possivel listar os clientes.');
        }
    })
}
const criaCliente = (nome, email, cpf, cep, cidade, estado, dataNasc) =>{
    return fetch(`http://localhost:3000/profile`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            cpf: cpf,
            cep: cep,
            cidade: cidade,
            estado: estado,
            dataNasc: dataNasc
        })
    
    }).then( response =>{
        if(response.ok){
        return response.body;
        }
        else{
            throw new Error ('Não foi possivel criar um cliente.');
        }
    })

}
const removeCliente = (id) =>{
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'    
    }).then(response =>{
        if (!response.ok){
            throw new Error ('Não foi possivel remover o cliente.');
        }
    })
}

const detalhesCliente = (id) =>{
    return fetch(`http://localhost:3000/profile/${id}`)
    .then( response =>{
        if(response.ok){
        return response.json();
        }
        else{
            throw new Error ('Não foi possivel exibir os detalhes do cliente.');
        }
    })
}

const atualizaCliente = (id, nome, email, cpf, cep, cidade, estado, dataNasc) =>{
    return fetch(`http://localhost:3000/profile/${id}`,{
        method:'PUT',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            cpf: cpf,
            cep: cep,
            cidade: cidade,
            estado: estado,
            dataNasc: dataNasc
        })
    })
    .then( response =>{
        if(response.ok){
        return response.json();
        }
        else{
            throw new Error ('Não foi possivel atualizar o cliente.');
        }
    })
}
export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhesCliente,
    atualizaCliente
}