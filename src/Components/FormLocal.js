import React, { useState } from "react";
import { Form } from "./style";
import { useEffect } from "react";
// crie um componente formulário com input controlado dentro dele
// esse input representa um nome de usuário, faça esse nome aparecer na tela
//crie mais um input controlado para adicionar uma tarefa para uma lista de tarefa 
//do usuário
//crie mais 2 botões:
//- um para salvar cada tarefa no local Storage da página
//- outro para renderizar a lista de tarefas que foi salva, 
//no local Storage, na tela
//PRÁTICA GUIADA 3
//Use o UseEffect para atualizar o localStorage sempre que alterar os inputs anteriores
export default function FormLocal() {
    const [nome, setNome] = useState(""); 
    const [tarefa, setTarefa] = useState("");
    const [listaTarefa, setListaTarefa] = useState([]);

    //função que irá alterar o estado nome
    // const alterarNome = (e) => {         
    //     setNome(e.target.value) //coloque o nome alterado//"sete" o nome // sempre que digitar pegue o conteúdo digitado
    //  agora eu vou guardar essa informação do input no local storage: no botão guardar dados
    //utilizando a função abaixo: que vai criar uma chave "user" e dar o valor do estado nome para esta chave
    const saveData = () => {
        localStorage.setItem("user", nome) //1o. param deve ser uma string, arbitrária, ou seja, qualquer nome
        //o 2o. param deve ser a informação que você quer guardar de fato. nesse caso, nome, o estado criado lá em cima, que 
        //vai guardar os meus dados toda vez que o user clicar em guardar dados (onClick), quando eu 
        //clicar no onClick guardar dados eu chamo a função saveData
    }
        const loadData = () => {
            const nomeLoad = localStorage.getItem("user")
            setNome(nomeLoad)
            //setNome(localStorage.getItem("user"))
        }
const atualizarLista = () => {
    setListaTarefa([tarefa, ...listaTarefa])
}
const saveLista = () => {
    const stringificado = JSON.stringify(listaTarefa)
    console.log(stringificado)
    localStorage.setItem("Tarefas", listaTarefa)
}

const loadLista = () => {
    const parseado = JSON.parse(localStorage.getItem("Tarefas"))
    setListaTarefa(parseado)
   
}
//tudo que estiver dentro desta função irá mudar por último no meu código
useEffect(()=> {
console.log("renderizou effect")
localStorage.setItem("user", nome)
}, [nome])
// }, [nome, tarefa])

useEffect(()=> {
    const stringificado = JSON.stringify(listaTarefa)
    localStorage.setItem("tarefas", stringificado)
}, [listaTarefa])

    return (
        <Form>
            <h3>Prática 1</h3>
            <label htmlFor="nome">
                nome:
                <input name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)}/> 
                {/* o value irá ficar diretamente ligado ao estado nome */}
                {/* onChange vai alterar/atualizar o estado sempre que o usuário digitar */}
            </label>
            {nome}
            <div>
                <button onClick={saveData}>Guardar Dados</button>
                <button onClick={loadData}>Acessar Dados</button>
            </div>
            <br />
            <h3>Prática 2</h3>
            <label htmlFor="tarefa">
                tarefa:
                <input name="tarefa" id="tarefa" 
                value={tarefa} onChange={(e)=>setTarefa(e.target.value)}/>
            </label>
            <button type="button" onClick={atualizarLista}>adicionar Tarefa</button>
            <ul>
                {listaTarefa.map((task) => {
                    return <li key={task}>{task}</li>;
                })}
            </ul>
            <div>
                <button onClick={saveLista}>Guardar tarefa</button>
                <button onClick={loadLista}>Acessar tarefa</button>
            </div>
        </Form>
    );
}