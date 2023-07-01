const camisaII2324 = {
    name: 'CAMISA CRUZEIRO II 23/24 S/N° TORCEDOR ADIDAS MASCULINA - BRANCO',
    price: '$349.99',
    type: 'camisa'
};
const res1 = await db.collection('produtos').doc('camisa').set(camisaII2324);

const camisaI2122 = {
    name: 'CAMISA CRUZEIRO I 21/22 S/N° TORCEDOR ADIDAS MASCULINA - AZUL',
    price: '$199.19',
    type: 'camisa'
};
const res2 = await db.collection('produtos').doc('camisa').set(camisaI2122);

const camisaTreino2324 = {
    name: 'CAMISA CRUZEIRO 23/24 S/N° TREINO ADIDAS MASCULINA - PRATA',
    price: '$229.99',
    type: 'camisa'
};
const res3 = await db.collection('produtos').doc('camisa').set(camisaTreino2324);

const camisaII2223 = {
    name: 'CAMISA CRUZEIRO II 22/23 S/N° TORCEDOR ADIDAS MASCULINA - BRANCO',
    price: '$229.99',
    type: 'camisa'
};
const res4 = await db.collection('produtos').doc('camisa').set(camisaII2223);

const jaqueta2324 = {
    name: 'JAQUETA CRUZEIRO 23/24 ADIDAS PRÉ JOGO MASCULINA - ROXO',
    price: '$599.99',
    type: 'jaqueta'
};
const res5 = await db.collection('produtos').doc('jaqueta').set(jaqueta2324);

const bone = {
    name: 'BONÉ CRUZEIRO ESTRELAS AZUL - AZUL',
    price: '$139.90',
    type: 'bone'
};
const res6 = await db.collection('produtos').doc('bone').set(bone);

const calcao2324 = {
    name: 'CALÇÃO CRUZEIRO 23/24 TREINO ADIDAS MASCULINO - ROXO',
    price: '$249.99',
    type: 'calcao'
};
const res7 = await db.collection('produtos').doc('calcao').set(calcao2324);

const camisaIII2223 = {
    name: 'CAMISA CRUZEIRO III 22/23 S/N° TORCEDOR ADIDAS MASCULINA - AMARELO',
    price: '$229.99',
    type: 'camisa'
};
const res8 = await db.collection('produtos').doc('camisa').set(camisaIII2223);

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
