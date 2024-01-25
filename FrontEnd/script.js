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

// FILTRES

const boutonsFilters = document.querySelectorAll('.filters button')
boutonsFilters.forEach((bouton) => {
  bouton.addEventListener('click', () => {
    const figures = Array.from(gallery.querySelectorAll('.gallery-item'))
    figures.forEach((figure) => {
      const figureCategory = figure.getAttribute('data-category')
      const boutonCategory = bouton.getAttribute('btn-category')
      if (figureCategory === boutonCategory) {
        figure.classList.remove('hidden')
      } else {
        figure.classList.add('hidden')
      }
    })
  })
})

const btnAll = document.querySelector('.btn-all')
btnAll.addEventListener('click', () => {
  const categorie = '0'
  const figures = document.querySelectorAll('figure.work')
  figures.forEach((figure) => figure.remove())
  getProjects(gallery)
  boutonsFilters(categorie)
})

const btnObj = document.querySelector('.btn-objects')
btnObj.addEventListener('click', () => {
  const categorie = '1'
  const filterObj = works.filter((work) => work.categoryId == categorie)
  const figures = document.querySelectorAll('figure.work')
  figures.forEach((figure) => figure.remove())
  getProjects(filterObj)
  boutonsFilters(categorie)
})

const btnAppart = document.querySelector('.btn-appartements')
btnAppart.addEventListener('click', () => {
  const categorie = '2'
  const filterAppart = works.filter((work) => work.categoryId == categorie)
  const figures = document.querySelectorAll('figure.work')
  figures.forEach((figure) => figure.remove())
  getProjects(filterAppart)
  boutonsFilters(categorie)
})

const btnHotel = document.querySelector('.btn-hotels-restaurants')
btnHotel.addEventListener('click', () => {
  const categorie = '3'
  const filterHotel = works.filter((work) => work.categoryId == categorie)
  const figures = document.querySelectorAll('figure.work')
  figures.forEach((figure) => figure.remove())
  getProjects(filterHotel)
  boutonsFilters(categorie)
})

// // générer les travaux dans la gallery
const urlWorks = 'http://localhost:5678/api/works'

const getProjects = (gallery) => {
  fetch(urlWorks)
    .then((res) => res.json())
    .then((data) => {
      gallery.innerHTML = data
        .map(
          (element) => `
          <figure class="gallery-item" data-category="${element.categoryId} data-id="${element.id}">
            <img src="${element.imageUrl}" alt="${element.imageUrl}">
            <figcaption>${element.title}</figcaption>
          </figure>`
        )
        .join('')
    })
}

// // gestion mode édition

document.addEventListener('DOMContentLoaded', async function () {
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

  // ouverture modale

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
    modal.addEventListener('click', closeModal)
    modal.querySelector('.close-modal').addEventListener('click', closeModal)
    modal.addEventListener('click', stopPropagation)
  }
  btnModifier.addEventListener('click', openModal)

  // générer les travaux dans la modale

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

      const btnTrash = document.querySelectorAll('p')
      for (let i = 0; i < btnTrash.length; i++) {
        btnTrash[i].addEventListener('click', () => {
          const idWorks = btnTrash[i].className
          const token = window.localStorage.getItem('token')
          deleteWorks(idWorks, token)
          alert(`Le travail d'id ${idWorks} a bien été supprimé !`)
        })
      }
    } catch (err) {
      alert('Le serveur ne fonctionne pas !')
    }
  }

  const response = await fetch('http://localhost:5678/api/works')
  const worksModal = await response.json()
  worksModal.forEach((work) => {
    const img = work.imageUrl
    const title = work.title
    const id = work.id
    getProjectsModal(img, title, id)
  })

  // suppresion des travaux dans la modale

  function deleteWorks(idWorks, token) {
    fetch(`http://localhost:5678/api/works/${idWorks}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const figureDeleteModal = document.getElementById(`${idWorks}`)
    const figureDelete = document.querySelector('.gallery-item')
    /* const figureDelete = document.querySelector(`[data-id=${idWorks}]`) */
    figureDeleteModal.remove()
    figureDelete.remove()
  }

  // Ajout de travaux dans la modale

  const btnArrowModal = document.querySelector('button.btnArrowModal')
  const divDelete = document.querySelector('.delete')
  const divAdd = document.querySelector('.add')
  const btnAjouter = document.querySelector('.btnAjouter')
  const btnValider = document.querySelector('button.btnValider')

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
