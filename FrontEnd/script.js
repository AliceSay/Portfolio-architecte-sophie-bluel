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
