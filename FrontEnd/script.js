function updateVisibility(isConnected) {
  const editionBar = document.querySelector('.content')
  const logoutLink = document.querySelector('.logout')
  const iconModifierDiv = document.querySelector('.icon-modifier')
  const loginLink = document.querySelector('.login')
  const filtersDiv = document.querySelector('.filters')

  if (isConnected) {
    // Utilisateur connecté : affichage des éléments
    editionBar.style.display = 'block'
    // logoutLink.style.display = 'block'
    logoutLink.classList.remove('hidden')
    iconModifierDiv.style.display = 'block'
    loginLink.classList.add('hidden')
    filtersDiv.classList.add('hidden')
  } else {
    // Utilisateur non connecté : affichage des éléments
    editionBar.style.display = 'none'
    logoutLink.classList.add('hidden')
    iconModifierDiv.style.display = 'none'
    loginLink.classList.remove('hidden')
    filtersDiv.classList.remove('hidden')
  }
}

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

// gestion mode édition

document.addEventListener('DOMContentLoaded', function () {
  const editionMode = localStorage.getItem('token_de_connexion')
  const isUserConnected = !!editionMode

  updateVisibility(isUserConnected)

  if (isUserConnected) {
    getProjects()

    const logoutLink = document.querySelector('.logout')
    logoutLink.addEventListener('click', () => {
      //         // supprime le token de connexion du localstorage
      localStorage.removeItem('token_de_connexion')
      //         // met à jour la visibilité en mode non connecté
      updateVisibility(false)
    })

    let modal = document.querySelector('#icon-modifier')
    const openModal = function (e) {
      e.preventDefault()
      modal.style.display = null
      modal.removeAttribute('aria-hidden')
      modal.setAttribute('aria-modal', 'true')
      modal.addEventListener('click', closeModal)
      modal.querySelector('#xmark').addEventListener('click', closeModal)
      modal
        .querySelector('.js-modal-stop')
        .addEventListener('click', stopPropagation)
    }

    const closeModal = function (e) {
      if (modal === null) return
      e.preventDefault()
      modal.style.display = 'none'
      modal.setAttribute('aria-hidden', 'true')
      modal.removeAttribute('aria-modal')
      modal.removeEventListener('click', closeModal)
      modal.querySelector('#xmark').removeEventListener('click', closeModal)
      modal
        .querySelector('.js-modal-stop')
        .removeEventListener('click', stopPropagation)
      modal = null
    }

    const stopPropagation = function (e) {
      e.stopPropagation()
    }

    document.querySelector('.js-modal').addEventListener('click', openModal)

    const modalWindow = document.querySelector('.modal-wrapper')

    const getModalProjects = () => {
      fetch(urlWorks)
        .then((res) => res.json())
        .then((data) => {
          modalWindow.innerHTML = data
            .map(
              (element) => `
         <figure class="modal-item" id="${element.id}">
         <img src="${element.imageUrl}" alt="${element.imageUrl}">
         </figure>`
            )
            .join('')

          const modalGallery = Array.from(
            modalWindow.querySelectorAll('.modal-item')
          )

          modalGallery.forEach((element) => {
            const span = document.createElement('span')
            const trash = document.createElement('i')
            trash.classList.add('fa-solid', 'fa-trash-can')
            trash.id = element.id
            span.appendChild(trash)
            element.appendChild(span)
          })
        })
    }
    getModalProjects()
  } else {
    console.log('Utilisateur non connecté')
    getProjects()
    console.log('Galerie remplie')
    const filterFiguresByCategory = (category) => {
      console.log('Click sur un filtré detecté')
      const figures = Array.from(gallery.querySelectorAll('.gallery-item'))
      console.log('Le contenu de la variable figures : ', figures)

      figures.forEach((figure) => {
        const figureCategory = figure.getAttribute('data-category')
        if (figureCategory === category || category === 'all') {
          figure.classList.remove('hidden')
        } else {
          figure.classList.add('hidden')
        }
      })

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
    }
  }
})
// } else {
//   getProjects()
//   const filterFiguresByCategory = (category) => {
//     const figures = Array.from(gallery.querySelectorAll('.gallery-item'))

//     figures.forEach((figure) => {
//       const figureCategory = figure.getAttribute('data-category')
//       if (figureCategory === category || category === 'all') {
//         figure.classList.remove('hidden')
//       } else {
//         figure.classList.add('hidden')
//       }
//     })

//     document
//       .querySelector('.btn-objects')
//       .addEventListener('click', () => filterFiguresByCategory('1'))
//     document
//       .querySelector('.btn-appartements')
//       .addEventListener('click', () => filterFiguresByCategory('2'))
//     document
//       .querySelector('.btn-hotels-restaurants')
//       .addEventListener('click', () => filterFiguresByCategory('3'))

//     document
//       .querySelector('.btn-all')
//       .addEventListener('click', () => filterFiguresByCategory('all'))
