const stateInfo = document.getElementById("state-info")
const btnCallback = document.getElementById("btnCallback");
const btnPromise = document.getElementById("btnPromise");
const ajaxSender = document.getElementById("ajax-sender");
const axiosSender = document.getElementById("axios-sender");
const postList = document.getElementById("post-list");

// Asynchrone

// Par callback

function doStuff( callback, failureCallback = undefined ) {
    console.log("doing the stuff");
    // ...
    callback('data')
}

function doOtherStuff( data, callback, failureCallback = undefined ) {
    console.log("doing other stuff with " + data);
    // ...
    callback('other data')
}

function doThirdStuff( data, callback, failureCallback = undefined ) {
    console.log("doing third stuff with " + data);
    // ...
    callback('third set of data')
}

btnCallback.addEventListener('click', () => {
    doStuff( (data1) => {
        doOtherStuff(data1, (data2) => {
            doThirdStuff( data2, (data3) => {
                console.log("last callback with data : " + data3)
            })
        })
    })
})

// Par promesse

function doStuffProm() {
    console.log("doing the stuff");
    // ...
    return 'data'
}

function doOtherStuffProm( data ) {
    console.log("doing other stuff with " + data);
    // ...
    return 'other data';
}

function doThirdStuffProm( data ) {
    console.log("doing third stuff with " + data);
    // ...
    return 'third set of data';
}


btnPromise.addEventListener('click', () => {
    let promise = function() {
        return new Promise((resolve) => resolve());
    }

    promise()
        .then( doStuffProm )
        .then( doOtherStuffProm )
        .then( doThirdStuffProm )
        .then( (value) => console.log("last callback with data : " + value) )
})

// Les mots clefs async/await

btnPromise.addEventListener('click', () => {
    
    // une fonction async renvoie une promesse
    async function promise() {
        doStuffProm();
    }

    promise()
        .then( doOtherStuffProm )
        .then( doThirdStuffProm )
        .then( (value) => console.log("last callback with data : " + value) )
})

// Pour attendre le résultat d'une promesse, on peut utiliser await.
// Dans du JS classique, uniquement utilisable dans une fonction async 
promise = () => new Promise((ok, ko) => {
    setTimeout(() => ok('data'), 2000)
})

async function awaitTest() {
    let data = await promise();
    console.log(data);
}
awaitTest();

promise().then(console.log);



// - AJAX demo

ajaxSender.addEventListener('click', () => {
    
    stateInfo.innerText = 'waiting for response';

    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {    
        if( request.readyState == 4 && request.status == 200 ){
            stateInfo.innerHTML = 'response status - ' + request.status
            const response = JSON.parse( request.responseText );
            response.forEach( (e) => {

                const li = document.createElement("li");
                const title = document.createElement("h3");
                const body = document.createElement("p");

                title.innerText = e.title;
                body.innerText = e.body;

                li.appendChild( title );
                li.appendChild( body );

                postList.appendChild(li);
            })
        }
    };
    request.open("GET", "https://jsonplaceholder.typicode.com/posts");
    request.send();
})

// axios

// axiosSender.addEventListener('click',() => {

//     stateInfo.innerText = 'waiting for response';

//     // axios({
//     //     method: 'GET',
//     //     url: 'https://jsonplaceholder.typicode.com/posts'
//     // })

//     axios.get("https://jsonplaceholder.typicode.com/posts")
//         .then( (response) => {
//             stateInfo.innerText = 'response status - ' + response.status;
//             if( response.status == 200 ) {
//                 response.data.forEach((e) => {
//                     const li = document.createElement("li");
//                         const title = document.createElement("h3");
//                         const body = document.createElement("p");

//                         title.innerText = e.title;
//                         body.innerText = e.body;

//                         li.appendChild( title );
//                         li.appendChild( body );

//                         postList.appendChild(li);
//                 })
//             }
//         })
// })


async function sendRequest() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

    stateInfo.innerText = 'response status - ' + response.status;
    
    if( response.status == 200 ) {
        response.data.forEach((e) => {
            const li = document.createElement("li");
            const title = document.createElement("h3");
            const body = document.createElement("p");

            title.innerText = e.title;
            body.innerText = e.body;

            li.appendChild( title );
            li.appendChild( body );

            postList.appendChild(li);
        })
    }
}

axiosSender.addEventListener('click', sendRequest);

// exo récupérer la liste des Todos
// affichez les sur votre site
// Ajouter un input permettant de choisir entre:
//      - afficher toutes les tâches
//      - afficher les tâches faites
//      - afficher les tâches à réaliser
// A coté de chaque Todo sera présent un bouton 'détail utilisateur'
// cliquer dessus permettra d'afficher sur le coté quelques infos sur l'utilisateur
// ayant posté cette tâche:
//      - nom
//      - username
//      - email
//      - nom de l'entreprise