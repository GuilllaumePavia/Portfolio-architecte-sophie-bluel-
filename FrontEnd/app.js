// Récup du token

const Deconnexion = document.querySelector(".deconnexion")
const Log = document.querySelector(".log")
Deconnexion.addEventListener("click", Dec)

function Dec() {
    window.localStorage.removeItem("token")
    window.location.reload()
}

const token = localStorage.getItem("token")

if(!token){
    const modeEdition = document.querySelector(".navigation-edition")
    modeEdition.style.display = "none";
    Deconnexion.style.display = "none"
    Log.style.display = "block"
}

let listCategory; //Une variable vide

fetch('http://localhost:5678/api/works')
    .then(response => response.json())//On va chercher tout les works
  
    .then(works => { // then quand c'est fait
        const blockGallery = document.querySelector('.gallery')//Récuperation de la classe gallery
        const modalGallery = document.querySelector('.modal-images')

        works.forEach(work => {//Parcours des works reçus
            const figure = document.createElement('figure')//Création de l'élément figure
            // ajouter l'id de la catégorie du work dans la figure
            figure.dataset.categoryId = work.categoryId //dataset ajouter des data là où il n'y en a pas
            figure.dataset.id = work.id
            // ajouter une classe sur la figure
            figure.className = 'work'
            figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>`
            blockGallery.appendChild(figure)//On ajoute figure dans gallery
            
            // ajout de l'image à modale 
            imageModal = document.createElement('img')
            imageModal.src = work.imageUrl
            imageModal.className = 'image-modal'

            
            // ajout de la figcaption
            imageModalFig = document.createElement('p')
            imageModalFig.className = 'work-modal'
            imageModalFig.innerText = 'Editer'
            
            // ajout de la poubelle
            deleteBtnImage = document.createElement('button')
            deleteBtnImage.className = 'remove-img' 
            deleteBtnImage.dataset.id = work.id
            deleteBtnImage.innerHTML = '<i class="fas fa-trash"></i>'
            
            // ajout de la div qui englobe
            divImageModal = document.createElement('div')
            divImageModal.className = 'modal-image'
            divImageModal.appendChild(imageModal)
            divImageModal.appendChild(imageModalFig)
            divImageModal.appendChild(deleteBtnImage)
            modalGallery.appendChild(divImageModal)
        });
    })

fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {// On a recupéré toutes les catégories
        listCategory = categories // On rempli des categories la let
        const blockCategory = document.querySelector('.categoryfilter');
        const buttonCategory = document.createElement('button')
        buttonCategory.innerHTML = 'Tous'
        buttonCategory.className = 'bouttonjs active'
        buttonCategory.value = 0
        blockCategory.appendChild(buttonCategory)//On ajoute le boutton dans le block
        buttonCategory.addEventListener('click', filterWorksByCategory) //Pour cliquer sur tous
        categories.forEach(category => {
            const buttonCategory = document.createElement('button')
            buttonCategory.className = 'bouttonjs'
            buttonCategory.value = category.id //C'est les 3 boutons
            buttonCategory.innerHTML = category.name //Category.name, c'est celui de la réponse de l'API
            buttonCategory.addEventListener('click', filterWorksByCategory) // Pour cliquer sur les autres
            blockCategory.appendChild(buttonCategory)//  
        })
    })


function filterWorksByCategory() {
    const categoryID = this.value //L'ID du boutton ou l'on a cliqué
    // Récup boutton qui contient la classe active
    document.querySelector('.active').classList.remove('active')
    // On ajoute la classe active sur le boutton qui a été cliqué
    this.classList.add('active')
    // Filtrer en fonction de l'ID de la catégorie en utilisant le dataset
    const works = document.querySelectorAll('.work')
    works.forEach(work => {
        // Cas du bouton tous  et pour les autres
        if (( categoryID == 0) || (work.dataset.categoryId == categoryID) ) {
            work.style.display = 'block'
        }
        else {
            work.style.display = 'none'
        }
    })

}



//       Un objet pour valider les inputs        //

const modalValidation = {
    titre: false,
    category: false,
  }
 
const titreInput = document.querySelector("#titre")
titreInput.addEventListener("input", newPhotoTitre)


//             Une pour s'assurer que l'input titre soit rempli            //
function newPhotoTitre() { 
    if (titreInput.value) {
      modalValidation.titre = true;
    }
    else {
        modalValidation.titre = false;
    }
}


const ValidationButton = document.querySelector('.validation-button')
ValidationButton.addEventListener('click', function(e) {
        e.preventDefault()
        newPhotoTitre(); 
        formData= new FormData(document.getElementById("new-photo-form"))
        fetch('http://localhost:5678/api/works', 
        {method: 'POST', headers : {'Authorization' : 'Bearer ' + token }, body: formData}) 
        .then(response => response.json())  
        .then(work => {
            // console.log(work)
          // ajout de l'image dans le DOM 
          const figure = document.querySelector(`figure[data-id="${id}"]`)
          figure.add()
          // ajout l'image dans la galerie de la modale 
          const imageModal = document.querySelector(`img[data-id="${id}"]`)
          imageModal.add()
         
        }
        
     )
     .catch (e => console.log(e))    
     alert("L'image a été ajouté")
})


