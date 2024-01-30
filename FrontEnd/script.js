function updateVisibility(isConnected) {
  const editionBar = document.querySelector('.content')
  const logoutLink = document.querySelector('.logout')
  const btnModifier = document.querySelector('.modal-btn')
  const loginLink = document.querySelector('.login')
  const filtersDiv = document.querySelector('.filters')

  if (isConnected) {
    // Utilisateur connecté : affichage des éléments
    editionBar.style.display = 'block'
    // logoutLink.style.display = 'block'
    logoutLink.classList.remove('hidden')
    btnModifier.style.display = 'block'
    loginLink.classList.add('hidden')
    filtersDiv.classList.add('hidden')
  } else {
    // Utilisateur non connecté : affichage des éléments
    editionBar.style.display = 'none'
    logoutLink.classList.add('hidden')
    btnModifier.style.display = 'none'
    loginLink.classList.remove('hidden')
    filtersDiv.classList.remove('hidden')
  }
}

//__________________________générer les travaux dans la modale____________________________

async function getProjectsModal(img, title, id) {
  try {
    const gallery = document.querySelector('div.galleryModal')
    const figureElement = document.createElement('figure')
    figureElement.classList.add('workModal')
    const imgElement = document.createElement('img')
    imgElement.src = img
    imgElement.alt = title
    const p = document.createElement('p')
    p.classList.add(`${id}`)
    const elementSuppr = document.createElement('i')
    elementSuppr.classList.add('fa-solid', 'fa-trash-can')
    figureElement.id = id
    p.appendChild(elementSuppr)
    figureElement.appendChild(p)
    figureElement.appendChild(imgElement)
    gallery.appendChild(figureElement)
    const token = window.localStorage.getItem('token')
    p.addEventListener('click', () => {
      deleteWorks(id, token)
      alert(`Le travail d'id ${id} a bien été supprimé !`)
    })
  } catch (err) {
    alert('Le serveur ne fonctionne pas !')
  }
}

// ____________________________générer les travaux dans la gallerie____________________________
let works
document.addEventListener('DOMContentLoaded', async function () {
  const urlWorks = 'http://localhost:5678/api/works'

  const getProjects = (gallery) => {
    fetch(urlWorks)
      .then((res) => res.json())
      .then((data) => {
        works = data
        gallery.innerHTML = data
          .map(
            (element) => `
          <figure class="gallery-item" data-category="${element.categoryId}" data-id="${element.id}">
            <img src="${element.imageUrl}" alt="${element.imageUrl}">
            <figcaption>${element.title}</figcaption>
          </figure>`
          )
          .join('')
      })
  }

  //___________________________FILTRES_________________________________________

  const btnAll = document.querySelector('.btn-all')
  btnAll.addEventListener('click', () => {
    const categorie = '0'
    const figures = document.querySelectorAll('figure.gallery-item')
    figures.forEach((figure) => figure.remove())
    getProjects(gallery)
  })

  const btnObj = document.querySelector('.btn-objects')
  btnObj.addEventListener('click', () => {
    const categorie = '1'
    const figures = document.querySelectorAll('figure.gallery-item')
    figures.forEach((figure) => {
      if (figure.dataset.category !== categorie) {
        figure.style.display = 'none'
      } else {
        figure.style.display = 'block'
      }
    })
    getProjects(filterObj)
  })

  const btnAppart = document.querySelector('.btn-appartements')
  btnAppart.addEventListener('click', () => {
    const categorie = '2'
    const figures = document.querySelectorAll('figure.gallery-item')
    figures.forEach((figure) => {
      if (figure.dataset.category !== categorie) {
        figure.style.display = 'none'
      } else {
        figure.style.display = 'block'
      }
    })
    getProjects(filterAppart)
  })

  const btnHotel = document.querySelector('.btn-hotels-restaurants')
  btnHotel.addEventListener('click', () => {
    const categorie = '3'
    const figures = document.querySelectorAll('figure.gallery-item')
    figures.forEach((figure) => {
      if (figure.dataset.category !== categorie) {
        figure.style.display = 'none'
      } else {
        figure.style.display = 'block'
      }
    })
    getProjects(filterHotel)
  })

  //________________________________gestion mode édition___________________________________________

  const gallery = document.getElementById('gallery')
  const editionMode = localStorage.getItem('token')
  const isUserConnected = !!editionMode

  updateVisibility(isUserConnected)
  getProjects(gallery)

  if (isUserConnected) {
    console.log('Utilisateur connecté')
    const logoutLink = document.querySelector('.logout')
    logoutLink.addEventListener('click', () => {
      //         // supprime le token de connexion du localstorage
      localStorage.removeItem('token')
      //         // met à jour la visibilité en mode non connecté
      window.location.reload()
    })
  }

  //______________________________ouverture modale_____________________________________

  const modalContainer = document.querySelector('.modal-container')
  const modalTriggers = document.querySelectorAll('.modal-trigger')
  modalTriggers.forEach((trigger) =>
    trigger.addEventListener('click', toggleModal)
  )
  function toggleModal() {
    modalContainer.classList.toggle('active')
  }

  const btnQuitterModal = document.querySelector('button.close-modal')

  btnQuitterModal.addEventListener('click', () => {
    toggleModal()
    resetForm()
  })

  const modal = document.querySelector('.modal')
  const btnModifier = document.querySelector('.modal-btn')
  const stopPropagation = function (e) {
    e.stopPropagation()
  }
  const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.close-modal').removeEventListener('click', closeModal)
    modal.removeEventListener('click', stopPropagation)
  }
  const openModal = function (e) {
    e.preventDefault()
    modal.style.display = 'block'
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.querySelector('.close-modal').addEventListener('click', closeModal)
    modal.addEventListener('click', stopPropagation)
  }
  btnModifier.addEventListener('click', openModal)

  const response = await fetch('http://localhost:5678/api/works')
  const worksModal = await response.json()
  worksModal.forEach((work) => {
    const img = work.imageUrl
    const title = work.title
    const id = work.id
    getProjectsModal(img, title, id)
  })

  // _________________________________Ajout de travaux dans la modale_________________________________

  const btnArrowModal = document.querySelector('.btnArrowModal')
  const divDelete = document.querySelector('.delete')
  const divAdd = document.querySelector('.add')
  const btnAjouter = document.querySelector('.btnAjouter')
  const btnValider = document.querySelector('.btnValider')

  btnAjouter.addEventListener('click', () => {
    divAdd.style.display = 'flex'
    divDelete.style.display = 'none'
    btnArrowModal.style.display = 'flex'
  })

  btnArrowModal.addEventListener('click', () => {
    divAdd.style.display = 'none'
    divDelete.style.display = 'flex'
    btnArrowModal.style.display = 'none'
  })
})
//_____________________________suppresion des travaux dans la modale________________________________

function deleteWorks(idWorks, token) {
  fetch(`http://localhost:5678/api/works/${idWorks}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const figureDeleteModal = document.getElementById(`${idWorks}`)

  const figureDelete = document.querySelector(
    `.gallery-item[data-id="${idWorks}"]`
  )

  figureDeleteModal.remove()
  figureDelete.remove()
}
// _______________________________________AFFICHAGE_MINIA_AJOUTER______________________________________

const iconeImg = document.querySelector('.formImg i.fa-image')
const pImage = document.querySelector('.formImg p')
const btnAjoutImg = document.querySelector('.formImg input#image')
const labelAjoutImg = document.querySelector('.formImg label')
const btnValider = document.querySelector('.btnValider')
btnAjoutImg.addEventListener('change', (event) => {
  const imageFiles = event.target.files
  const imageFilesLength = imageFiles.length
  if (imageFilesLength > 0) {
    const imageSrc = URL.createObjectURL(imageFiles[0])
    const imagePreviewElement = document.createElement('img')
    imagePreviewElement.src = imageSrc
    imagePreviewElement.style.display = 'block'
    const divFormImg = document.querySelector('.formImg')
    divFormImg.appendChild(imagePreviewElement)
    iconeImg.style.display = 'none'
    pImage.style.display = 'none'
    labelAjoutImg.style.display = 'none'
  }
})

// _______________________________________FONCTION_AJOUTER_WORKS______________________________________

async function addWorks() {
  const image = document.getElementById('image').files
  const title = document.getElementById('title').value
  const category = document.getElementById('category').value

  if (image.length === 0 || title === '' || category === '0') {
    alert('Remplisser tous les champs !')
  } else {
    try {
      const data = new FormData()
      data.append('image', image[0])
      data.append('title', title)
      data.append('category', category)
      const token = window.localStorage.getItem('token')
      const response = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',

          Authorization: `Bearer ${token}`,
        },
        body: data,
      })

      if (response.status === 201) {
        const fetchAddWorks = await response.json()
        const img = fetchAddWorks.imageUrl
        const title = fetchAddWorks.title
        const id = fetchAddWorks.id
        const gallery = document.querySelector('div.gallery')
        const figureElement = document.createElement('figure')
        figureElement.classList.add('work', `work${fetchAddWorks.id}`)
        const imgElement = document.createElement('img')
        const figCaptionElement = document.createElement('figCaption')
        imgElement.src = img
        imgElement.alt = `${title}`
        figCaptionElement.innerText = `${title}`
        figureElement.appendChild(imgElement)
        figureElement.appendChild(figCaptionElement)
        gallery.appendChild(figureElement)

        getProjectsModal(img, title, id)
        alert(`${title} a bien été ajouté avec succès !`)
        resetForm()
      } else if (response.status === 401) {
        alert("Vous n'êtes pas connecté !")
        window.location.href = 'login.html'
      }
    } catch (err) {
      console.log(err)
    }
  }
}

btnValider.addEventListener('click', () => {
  addWorks()
})

function resetForm() {
  iconeImg.style.display = 'block'
  pImage.style.display = 'block'
  labelAjoutImg.style.display = 'block'
  document.querySelector('.formImg img').remove()
  document.getElementById('idFormModal').reset()
}

// _______________________________________FONCTION_VERIF_CHAMPS_FORM______________________________________

function verif() {
  const image = document.getElementById('image').files
  const title = document.getElementById('title').value
  const category = document.getElementById('category').value
  const btnValider = document.querySelector('.btnValider')

  if (image.length === 1 && title && category != 0) {
    btnValider.style.background = '#1D6154'
  } else {
    btnValider.style.background = '#A7A7A7'
  }
}

const form = document.getElementById('idFormModal')

form.addEventListener('change', () => {
  verif()
})
