// récupération de la modale
const modal = document.querySelector('#ancre1')

// récupération du button de la modale 
const modalOpen = document.querySelector(".boutton-edition")
modalOpen.addEventListener("click", showModal)

/* Une fonction qui reprend toutes les categories du work */
function setOptions(categories) {
    const selectCategory = document.getElementById("category")
    let html = ""
for(category of categories) { // La boucle for  qui pour chaque categorie de categories ajoute le html
    html += `<option value="${category.id}">${category.name}</option>`
}
selectCategory.innerHTML= html
}

// afficher la modale
function showModal(e) {
    e.preventDefault()
    modal.style.display = "block"
    Delete()
    setOptions(listCategory) 
}


const crossModal = document.querySelector("#modal-close")
crossModal.addEventListener("click", buttonModalClose)

function buttonModalClose(e) {
    if (modal === null) return
    e.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        // modal = null
    }, 200)
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
        buttonModalClose(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})

// Prendre une fois que le document est chargé
document.addEventListener("DOMContentLoaded", function () {
    const dropzoneModalImage = document.querySelector(".gallery-modal"); // La gallery pour le style
    const inputFile = document.querySelector("#modalInputFile"); // Pour mettre les images
    dropzoneModalImage.addEventListener('click', (e) => {
        e.preventDefault();
        inputFile.click(); //Pour ouvrir la boite de dialogue
    })

  
    dropzoneModalImage.addEventListener('dragover', (e) => { //dragover' qui se déclenche lorsqu'un élément en cours de déplacement se déplace dans la zone de drop.
        e.preventDefault();
        e.stopPropagation();//Pour que ça reste dans l'input
        e.dataTransfer.dropEffect = "copy";//Pour envoyer les infos
        dropzoneModalImage.classList.add('dropzoneover'); // Pour mettre une couleur au survol
    })

    dropzoneModalImage.addEventListener('dragleave', (e) => { // dragleave se déclenche lorsqu'un élément en cours de déplacement quitte la zone de drop.
        e.stopPropagation(); 
        dropzoneModalImage.classList.remove('dropzoneover');
    })

    

    dropzoneModalImage.addEventListener('drop', (e) => { // drop se déclenche lorsqu'un élément en cours de déplacement est déposé dans la zone de drop.
        e.preventDefault();
        e.stopPropagation();
        dropzoneModalImage.classList.remove('dropzoneover');
        inputFile.files = e.dataTransfer.files; //Pour récupérer les infos
        

        // affichage du nom dans la zone bleu 
        affichagePhoto( inputFile.files )
    })

    inputFile.addEventListener('change', (e) => { // On a le droit à l'erreur on peut changer
        affichagePhoto( inputFile.files )
    })

    function affichagePhoto( files ) {
        const galleryModalDeco = document.querySelector(".gallery-modal-deco")
        galleryModalDeco.style.display= "none"
        const formData= new FormData(document.getElementById("new-photo-form"))
        let fileList = Array.from( files ); // La méthode Array.from() permet de créer une nouvelle instance d'Array
       
        // dropzoneModalImage.style.background = `url(${URL.createObjectURL(files[0])}) no-repeat ` //ou URL.createObjectURL(document.getElementById('modalInputFile').files[0])
        // dropzoneModalImage.style.backgroundSize = "contain"
        const dropImg = document.createElement('dropImg')
        dropImg.innerHTML = `<div></div>`
        dropImg.className = 'dropIMG'
        dropImg.style.background = `url(${URL.createObjectURL(files[0])}) no-repeat ` //ou URL.createObjectURL(document.getElementById('modalInputFile').files[0])
        dropImg.style.backgroundSize = "contain"
        dropzoneModalImage.appendChild(dropImg)//On ajoute figure dans gallery
        const validationButton = document.querySelector('.validation-button')
        if(dropImg =="") {
            validationButton.style.background= "#939393a5"
        }
        else {
            validationButton.style.background= "#1D6154"
        }
        console.log(validationButton)
       
    }    
})


const blockGallery = document.querySelector(".gallery")
//console.log(blocGallery)

// si on clique sur le bouton d'ajout d'une image on affiche la formulaire d'ajout
const btnAddImage = document.querySelector('.modal-galerie-btn-add')
btnAddImage.addEventListener('click', function (e) {
    e.preventDefault()
    const formAddImage = document.querySelector('.modal-form-add-image')
    formAddImage.style.display = "block"
    document.querySelector('.modal-symbol-back').style.display = "block"
    // cacher la galerie 
    const modalGalerie = document.querySelector('.modal-galerie')
    modalGalerie.style.display = "none"
})

// si on clique sur le bouton de retour on affiche la galerie
const btnModalBack = document.querySelector('.modal-symbol-back')
btnModalBack.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('.modal-galerie').style.display = "block"

    // Cacher le formulaire d'ajout 
    document.querySelector('.modal-form-add-image').style.display = "none"
    document.querySelector('.modal-symbol-back').style.display = "none"
    console.log("back")
})


// Si on clique sur le bouton de suppression d'une image on supprime l'image avec l'id correspondant
// vérifier que le DOM est chargé
function Delete() {
const btnDeleteImage = document.querySelectorAll('.remove-img')

btnDeleteImage.forEach(btn => {
    btn.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.currentTarget.getAttribute("data-id") // Récuperer le data-id de la poubelle
        // suppression de l'image 
                fetch(`http://localhost:5678/api/works/${id}`, {
                    method: 'DELETE', headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token }, body: JSON.stringify({id})})
                    .then(() => {
                        e.preventDefault();
                        e.target.parentElement.parentElement.remove()//Enlever l'image affilié ai data-id du modal
                    })
                    alert("L'image a été retiré")
        })
     })
}



