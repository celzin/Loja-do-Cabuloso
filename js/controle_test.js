var pagina = -1;
var elementos = 0;

function Pessoa(nome, email, telefone) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
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

    var nome = document.getElementById("nomeid");
    var telefone = document.getElementById("telefoneid");
    var email = document.getElementById("emailid");

    var aux_Nome = nome.value;
    var aux_Telefone = telefone.value;
    var aux_Email = email.value;

    const novoRegistro = await db.collection('pessoas').add({
        nome: aux_Nome,
        email: aux_Email,
        telefone: aux_Telefone
    })

    if (nome.value != "" && email.value != "" && telefone.value != "") {
        var novo = new Pessoa(nome.value, email.value, telefone.value);
        listaPessoas.push(novo);
        document.getElementById("nomeid").value = "";
        document.getElementById("telefoneid").value = "";
        document.getElementById("emailid").value = "";

        alert("Dados cadastrados com sucesso!");

        // Atualiza a área de exibição dos dados cadastrados
        AtualizarDadosCadastrados();
        CriarTabela();

        elementos++;
        pagina = -1;
    } else {
        alert("TODOS OS CAMPOS SÃO OBRIGATÓRIOS");
    }
}

function Exibir() {
    document.getElementById("nomeid").value = listaPessoas[pagina].nome;
    document.getElementById("telefoneid").value = listaPessoas[pagina].telefone;
    document.getElementById("emailid").value = listaPessoas[pagina].email;
}

function Limpar() {
    document.getElementById("nomeid").value = "";
    document.getElementById("telefoneid").value = "";
    document.getElementById("emailid").value = "";
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
            "Nome: " +
            pessoa.nome +
            ", Telefone: " +
            pessoa.telefone +
            ", Email: " +
            pessoa.email;
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
    colunaCabecalho1.textContent = "Nome";
    colunaCabecalho2.textContent = "Telefone";
    colunaCabecalho3.textContent = "Email";
    colunaCabecalho4.textContent = "Ação";
    linhaCabecalho.appendChild(colunaCabecalho1);
    linhaCabecalho.appendChild(colunaCabecalho2);
    linhaCabecalho.appendChild(colunaCabecalho3);
    linhaCabecalho.appendChild(colunaCabecalho4);
    tabela.appendChild(linhaCabecalho);

    // Cria as linhas de dados
    for (var i = 0; i < listaPessoas.length; i++) {
        var pessoa = listaPessoas[i];
        var linha = document.createElement("tr");
        var coluna1 = document.createElement("td");
        var coluna2 = document.createElement("td");
        var coluna3 = document.createElement("td");
        var coluna4 = document.createElement("td");
        coluna1.textContent = pessoa.nome;
        coluna2.textContent = pessoa.telefone;
        coluna3.textContent = pessoa.email;
        var botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.setAttribute("onclick", "RemoverElemento(" + i + ")");
        coluna4.appendChild(botaoRemover);
        linha.appendChild(coluna1);
        linha.appendChild(coluna2);
        linha.appendChild(coluna3);
        linha.appendChild(coluna4);
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
