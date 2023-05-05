const objetValidation = {
  email: false,
  password: false,
}

//              C'est pour valider le mail                                        //


//console.log(objetValidation)
const mail = document.querySelector ('.email')// Label et input
const inputsMail = document.querySelector(".inputs-mail");// Input mail

//C'est pour Valider le mail
mail.addEventListener ('input', mailValidation)
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mailValidation() {
  document.querySelector('#formErrorMessage').textContent = ''
  if (regexEmail.test(inputsMail.value)) {//On test le regext avec ce qu'on a marqué dans l'input
    objetValidation.email = true; // Et on confirme l'objet
  }
  else {
    objetValidation.email = false; // Sinon on infirme l'objet
  }
}



//              C'est pour valider le mot de passe                                        //


//C'est l'input du mot de passe
const inputsPassInput = document.querySelector(".inputs-pass") 
//console.log(inputsPassInput)
inputsPassInput.addEventListener("input", passwordValidation)

// Un objet qui prend la longueur et un num
const passwordVerification = {
length: false,
num: false,
}

let passwordValue;

//La fonction
function passwordValidation() {
  document.querySelector('#formErrorMessage').textContent = ''
passwordValue = inputsPassInput.value; // On vérifie qu'il y ai quelquechose dans l'input
let validationResult = 0; // Pour préparer la boucle

for (const boucle in passwordVerification) { // On boucle dans l'objet
    if (passwordValue.length < 6  && !/[0-9]/.test(passwordValue)) { // On vérifie qu'il y ai minimum 6 lettres
      passwordVerification.length = false;                           // Et un  num
      passwordVerification.num = false;
      objetValidation.password = false;
    }
    else {
      passwordVerification.length = true;
      passwordVerification.num = true;
      objetValidation.password = true;
      // validationResult++;
    }
 }
}




//                            Pour envoyer les infos                                  //


const formConnexion = document.querySelector('#form-connexion')
formConnexion.addEventListener ('submit', (e) => Connexion(e))

function Connexion(e) {
  e.preventDefault()//Bloquer le comportement par défaut du formulaire

  const user = {
    email: document.getElementById('email').value,
    password: document.getElementById('pass').value
  }

  //L'envoie des infos à l'API
  fetch('http://localhost:5678/api/users/login', 
  {method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify(user)})
  //L'interface Headers de l'API Fetch vous permet d'effectuer des actions sur les en-têtes de requête et de réponse HTTP. 
  //Ces actions incluent la récupération, la configuration, l’ajout et la suppression.
  .then(response => response.json())
  .then(data => {// On chope les data de la réponse
    //console.log(data)
      if (!data.error) {//Si on a pas d'erreur // Sinon le serveur renvoie un token, alors le login est un succès // On stocke le token dans le localStorage
       // La méthode setItem() de l'interface Storage, fonctionne avec le duo 'clé-valeur', //le duo s'ajoute à l'emplacement de stokage   
        localStorage.setItem('token', data.token)
        // On redirige vers la page d'accueil de l'application
        window.location.href = '/FrontEnd/index.html' //On prend le lien de localisation de la fenetre.    
      } else {
        // si le serveur renvoie une erreur, c'est qu'il y a une erreur dans les identifiants
        const formError = document.querySelector('#formErrorMessage')
        // on affiche le message d'erreur (Utilisateur non trouvé ou mot de passe incorrect)
        formError.textContent = "Email ou mot de passe incorrect"

      }
    })

      //La propriété localStorage permet d'accéder à un objet local Storage
      //Les données stockées dans le localStorage n'ont pas de délai d'expiration
      //L'objet window représente une fenêtre contenant un document DOM
 }












