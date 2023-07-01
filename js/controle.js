var elementos = 0;

class Pessoa {
    constructor(email, nome, sobrenome, nick, telefone, cep, estado, endereco, cidade, mensagem) {
        this.email = email;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.nick = nick;
        this.telefone = telefone;

        this.cep = cep;
        this.estado = estado;
        this.endereco = endereco;
        this.cidade = cidade;
        this.mensagem = mensagem;
    }
}

var listaPessoas = [];

async function Cadastrar() {

    const camisaI2122 = {
        name: 'CAMISA CRUZEIRO I 21/22 S/N° TORCEDOR ADIDAS MASCULINA - AZUL',
        price: '$199.19',
        type: 'camisa'
    };
    const res2 = await db.collection('produtos').doc('camisa').set(camisaI2122);

    // CADASTRO PESSOA
    var email = document.getElementById("emailid");
    var nome = document.getElementById("firstid");
    var sobrenome = document.getElementById("lastid");
    var nick = document.getElementById("nickid");
    var telefone = document.getElementById("numberid");

    //ENTREGA PESSOA
    var cep = document.getElementById("zipid");
    var estado = document.getElementById("regionid");
    var endereco = document.getElementById("addid");
    var cidade = document.getElementById("cityid");
    var mensagem = document.getElementById("messageid");

    var aux_Email = email.value;
    var aux_Nome = nome.value;
    var aux_Sobrenome = sobrenome.value;
    var aux_Nick = nick.value;
    var aux_Telefone = telefone.value;

    var aux_Cep = cep.value;
    var aux_Estado = estado.value;
    var aux_Endereco = endereco.value;
    var aux_Cidade = cidade.value;
    var aux_Mensagem = mensagem.value;

    const novoRegistro = await db.collection('cabeludos').add({
        email: aux_Email,
        nome: aux_Nome,
        sobrenome: aux_Sobrenome,
        nick: aux_Nick,
        telefone: aux_Telefone,

        cep: aux_Cep,
        estado: aux_Estado,
        endereco: aux_Endereco,
        cidade: aux_Cidade,
        mensagem: aux_Mensagem
    })

    if (email.value != "" && nome.value != "" && sobrenome.value != "" && telefone.value != "" &&
        cep.value != "" && estado.value != "" && endereco.value != "" && cidade.value != "") {

        var novo = new Pessoa(email.value, nome.value, sobrenome.value, nick.value, telefone.value,
            cep.value, estado.value, endereco.value, cidade.value, mensagem.value);
        listaPessoas.push(novo);

        document.getElementById("emailid").value = "";
        document.getElementById("firstid").value = "";
        document.getElementById("lastid").value = "";
        document.getElementById("nickid").value = "";
        document.getElementById("numberid").value = "";

        document.getElementById("zipid").value = "";
        document.getElementById("regionid").value = "";
        document.getElementById("addid").value = "";
        document.getElementById("cityid").value = "";
        document.getElementById("messageid").value = "";

        alert("Dados cadastrados com sucesso!");

        // Atualiza a área de exibição dos dados cadastrados
        AtualizarDadosCadastrados();

        elementos++;
    } else {
        alert("Preencha os campos obrigatórios!");
    }
}

function AtualizarDadosCadastrados() {
    var dadosCadastrados = document.getElementById("dadosCadastrados");
    dadosCadastrados.innerHTML = ""; // Limpa os dados anteriores

    for (var i = 0; i < listaPessoas.length; i++) {
        var pessoa = listaPessoas[i];
        var infoPessoa = document.createElement("p");
        infoPessoa.textContent =
            "Email: " +
            pessoa.email +
            ", Nome: " +
            pessoa.nome +
            ", Sobrenome: " +
            pessoa.sobrenome +
            ", Nick: " +
            pessoa.nome +
            ", Telefone: " +
            pessoa.telefone +
            ", CEP: " +
            pessoa.cep +
            ", Estado: " +
            pessoa.estado +
            ", Endereço: " +
            pessoa.endereco +
            ", Cidade: " +
            pessoa.cidade +
            ", Mensagem: " +
            pessoa.mensagem;
        dadosCadastrados.appendChild(infoPessoa);
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyCKJwXWqwUu-BHmq_KjyG_ldri5vxi0o1g",
    authDomain: "cabeludo-e0abf.firebaseapp.com",
    databaseURL: "https://cabeludo-e0abf-default-rtdb.firebaseio.com",
    projectId: "cabeludo-e0abf",
    storageBucket: "cabeludo-e0abf.appspot.com",
    messagingSenderId: "122903428334",
    appId: "1:122903428334:web:9e0eeb4d1c70b314c6c7ff"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();  