var pagina = -1;
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

function Proximo() {
    if (elementos > 0 && pagina < elementos - 1) {
        pagina++;
        Exibir();
    } else {
        alert("Não existe uma próxima página");
    }
}

async function Cadastrar() {
    //const categoria = db.collection('pessoas')
    // //const snapshot = await categoria.where('nome', '==', 'teste').get()
    //const snapshot = await categoria.get()
    //snapshot.forEach(doc => {
    //    var dados = doc.data()
    //    console.log(doc.id, ': ', dados.nome, dados.email, dados.telefone)
    //});

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
        CriarTabela();

        elementos++;
        pagina = -1;
    } else {
        alert("Preencha os campos obrigatórios!");
    }
}

function Exibir() {
    document.getElementById("emailid").value = listaPessoas[pagina].email;
    document.getElementById("firstid").value = listaPessoas[pagina].nome;
    document.getElementById("lastid").value = listaPessoas[pagina].sobrenome;
    document.getElementById("nickid").value = listaPessoas[pagina].nick;
    document.getElementById("numberid").value = listaPessoas[pagina].number;

    document.getElementById("zipid").value = listaPessoas[pagina].email;
    document.getElementById("regionid").value = listaPessoas[pagina].nome;
    document.getElementById("addid").value = listaPessoas[pagina].sobrenome;
    document.getElementById("cityid").value = listaPessoas[pagina].nick;
    document.getElementById("messageid").value = listaPessoas[pagina].number;
}

function Limpar() {
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
}

function Anterior() {
    if (elementos > 0 && pagina > 0) {
        pagina--;
        Exibir();
    } else {
        alert("Não existe uma página anterior");
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

function CriarTabela() {
    var tabela = document.getElementById("tabelaid");
    tabela.innerHTML = ""; // Limpa a tabela anterior

    // Cria a linha de cabeçalho
    var linhaCabecalho = document.createElement("tr");
    var colunaCabecalho1 = document.createElement("th");
    var colunaCabecalho2 = document.createElement("th");
    var colunaCabecalho3 = document.createElement("th");
    var colunaCabecalho4 = document.createElement("th");
    var colunaCabecalho5 = document.createElement("th");
    var colunaCabecalho6 = document.createElement("th");
    colunaCabecalho1.textContent = "Email";
    colunaCabecalho2.textContent = "Nome";
    colunaCabecalho3.textContent = "Sobrenome";
    colunaCabecalho4.textContent = "Nick";
    colunaCabecalho5.textContent = "Telefone";
    colunaCabecalho6.textContent = "Ação";
    linhaCabecalho.appendChild(colunaCabecalho1);
    linhaCabecalho.appendChild(colunaCabecalho2);
    linhaCabecalho.appendChild(colunaCabecalho3);
    linhaCabecalho.appendChild(colunaCabecalho4);
    linhaCabecalho.appendChild(colunaCabecalho5);
    linhaCabecalho.appendChild(colunaCabecalho6);
    tabela.appendChild(linhaCabecalho);

    // Cria as linhas de dados
    for (var i = 0; i < listaPessoas.length; i++) {
        var pessoa = listaPessoas[i];
        var linha = document.createElement("tr");
        var coluna1 = document.createElement("td");
        var coluna2 = document.createElement("td");
        var coluna3 = document.createElement("td");
        var coluna4 = document.createElement("td");
        var coluna5 = document.createElement("td");
        var coluna6 = document.createElement("td");
        var coluna7 = document.createElement("td");
        var coluna8 = document.createElement("td");
        var coluna9 = document.createElement("td");
        var coluna10 = document.createElement("td");
        var coluna12 = document.createElement("td");
        var coluna11 = document.createElement("td");
        coluna1.textContent = pessoa.email;
        coluna2.textContent = pessoa.nome;
        coluna3.textContent = pessoa.sobrenome;
        coluna4.textContent = pessoa.nick;
        coluna5.textContent = pessoa.telefone;

        coluna6.textContent = pessoa.cep;
        coluna7.textContent = pessoa.estado;
        coluna8.textContent = pessoa.endereco;
        coluna9.textContent = pessoa.cidade;
        coluna10.textContent = pessoa.mensagem;

        var botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.setAttribute("onclick", "RemoverElemento(" + i + ")");
        coluna11.appendChild(botaoRemover);

        linha.appendChild(coluna1);
        linha.appendChild(coluna2);
        linha.appendChild(coluna3);
        linha.appendChild(coluna4);
        linha.appendChild(coluna5);
        linha.appendChild(coluna6);
        linha.appendChild(coluna7);
        linha.appendChild(coluna8);
        linha.appendChild(coluna9);
        linha.appendChild(coluna10);
        linha.appendChild(coluna11);
        tabela.appendChild(linha);
    }
}

function RemoverElemento(index) {
    listaPessoas.splice(index, 1);
    elementos--;
    pagina = -1;

    AtualizarDadosCadastrados();
    CriarTabela();
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
