const gallery = document.getElementById('gallery')
const urlWorks = 'http://localhost:5678/api/works'

const getProjects = () => {
  fetch(urlWorks)
    .then((res) => res.json())
    .then((data) => {
      gallery.innerHTML = data
        .map(
          (element) => `
         <figure class="gallery-item" data-category="${element.categoryId}">
           <img src="${element.imageUrl}" alt="${element.imageUrl}">
           <figcaption>${element.title}</figcaption>
         </figure>`
        )
        .join('')
    })
}

const filterFiguresByCategory = (category) => {
  const figures = Array.from(gallery.querySelectorAll('.gallery-item'))

  figures.forEach((figure) => {
    const figureCategory = figure.getAttribute('data-category')
    if (figureCategory === category || category === 'all') {
      figure.classList.remove('hidden')
    } else {
      figure.classList.add('hidden')
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  getProjects()

  document
    .querySelector('.btn-objects')
    .addEventListener('click', () => filterFiguresByCategory('1'))
  document
    .querySelector('.btn-appartements')
    .addEventListener('click', () => filterFiguresByCategory('2'))
  document
    .querySelector('.btn-hotels-restaurants')
    .addEventListener('click', () => filterFiguresByCategory('3'))

  document
    .querySelector('.btn-all')
    .addEventListener('click', () => filterFiguresByCategory('all'))
})

// gestion du mode édition
document.addEventListener('DOMContentLoaded', function () {
  let editionMode = localStorage.getItem('token de connexion')

  // vérifie si l'utilisateur est connecté en fonction du token
  const isUserConnected = !!editionMode

  // met à jour la visibilité des éléments en fonction du statut de connexion
  updateVisibility(isUserConnected)
  // Fonction pour mettre à jour la visibilité des éléments en fonction du mode
  function updateVisibility(isConnected) {
    const contentDiv = document.getElementById('content')
    const logoutLink = document.querySelector('.logout')
    const iconModifierDiv = document.querySelector('.icon-modifier')
    const loginLink = document.querySelector('.login')
    const filtersDiv = document.querySelector('.filters')

    if (isConnected) {
      // utilisateur connecté : Affichage des éléments
      contentDiv.classList.remove('hidden')
      logoutLink.style.display = 'block'
      iconModifierDiv.style.display = 'block'
      loginLink.style.display = 'none'
      filtersDiv.classList.add('hidden')
    } else {
      // utilisateur non connecté : Affichage des éléments'
      contentDiv.style.display = 'none'
      logoutLink.style.display = 'none'
      iconModifierDiv.style.display = 'none'
      loginLink.style.display = 'block'
      filtersDiv.classList.remove('hidden')
    }
  }
  // met à jour la visibilité initiale
  updateVisibility(isUserConnected)

  // rebascule en mode public au clic sur logout
  const logoutLink = document.querySelector('.logout')
  logoutLink.addEventListener('click', () => {
    // supprime le token de connexion du localstorage
    localStorage.removeItem('token de connexion')
    // met à jour la visibilité en mode no connecté
    updateVisibility(false)
  })
})

// JS du Modal

let modal = null

const openModal = function (e) {
  e.preventDefault()

  const target = document.querySelector('#modifier')
  target.style.display = 'block'
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('#xmark').addEventListener('click', closeModal)
}

const closeModal = function (e) {
  if (modal !== null) {
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('#xmark').removeEventListener('click', closeModal)
    modal = null
  }
}
document.querySelector('#btn-modifier').addEventListener('click', openModal)

const modalWindow = document.querySelector('.modal')
const getProjectsModal = () => {
  fetch(urlWorks)
    .then((res) => res.json())
    .then((data) => {
      modalWindow.innerHTML = data
        .map(
          (element) => `
         <figure class="gallery-item" data-category="${element.categoryId}">
         <i>Poubelle</i>
           <img src="${element.imageUrl}" alt="${element.imageUrl}">
         </figure>`
        )
        .join('')
    })
}
getProjectsModal()
