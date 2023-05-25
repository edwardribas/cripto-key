const form = document.querySelector('form');
const input1 = document.querySelector('input.input1');
const input2 = document.querySelector('input.input2');
const selectInput = document.querySelector('#metodo');
const resultado = document.querySelector('.resultado');
const BASE_URL = "http://localhost:3000";

const handleSubmit = async (e) => {
    e.preventDefault();

    let retorno;
    const valorInputTexto = input1.value;
    const valorInputChave = input2.value;
    
    if (!valorInputChave || !valorInputTexto) return;
    
    const rotaAPI = selectInput.options[selectInput.selectedIndex].value === "1"
        ? "encrypt"
        : "decrypt";
    
    const data = await fetch(`${BASE_URL}/${rotaAPI}?text=${valorInputTexto}&key=${valorInputChave}`);
    retorno = await data.json();

    resultado.innerHTML = `
        <p>Texto: <b>${retorno.text}</b></p>
        <p>Chave: <b>${retorno.key}</b></p>
        <p>Resultado: <b>${retorno.result}</b></p>
    `;

    resultado.classList.add('active');

};

form.addEventListener('submit', handleSubmit);