document.addEventListener('DOMContentLoaded', function () {
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
  // fonction pur récupérer les projets dans le modal
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
})
