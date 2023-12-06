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
  // variable pour représenter le mode (true pour édition, false pour public)
  let isEditionMode = false

  // Fonction pour basculer entre le mode public et édition
  function toggleMode() {
    isEditionMode = !isEditionMode
    // console.log('Mode basculé vers :', isEditionMode ? 'Édition' : 'Public')
    updateVisibility()
  }
  // Fonction pour mettre à jour la visibilité des éléments en fonction du mode
  function updateVisibility() {
    const contentDiv = document.getElementById('content')
    const logoutLink = document.querySelector('.logout')
    const iconModifierDiv = document.querySelector('.icon-modifier')
    const loginLink = document.querySelector('.login')
    const filtersDiv = document.querySelector('.filters')
    console.log(filtersDiv)

    if (isEditionMode) {
      // Mode Édition : Affichage des éléments
      logoutLink.style.display = 'block'
      iconModifierDiv.style.display = 'block'
      loginLink.style.display = 'none'
      filtersDiv.classList.add('hidden')
    } else {
      // Mode Public : Affichage des éléments'
      contentDiv.style.display = 'none'
      logoutLink.style.display = 'none'
      iconModifierDiv.style.display = 'none'
      loginLink.style.display = 'block'
      filtersDiv.classList.remove('hidden')
    }
  }
  toggleMode()
  updateVisibility()

  // rebascule en mode public au click sur logout
  const logoutLink = document.querySelector('.logout')
  logoutLink.addEventListener('click', () => {
    isEditionMode = false
    console.log('cliqué sur logout')
    updateVisibility()
  })
})
