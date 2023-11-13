// récupération des travaux

const url = 'http://localhost:5678/api/works'
const gallery = document.getElementById('gallery')

// Remplir la gallery
const getProjects = () => {
  fetch(url)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      for (element in data) {
        gallery.innerHTML += `<figure data-category="${data[element].categoryId}">
                                <img src="${data[element].imageUrl}" alt="${data[element].imageUrl}">
                                <figcaption>${data[element].title}</figcaption>
                              </figure>`
      }
    })
}

getProjects()

// tri des travaux

const btnObjects = document.querySelector('.btn-objects')
btnObjects.addEventListener('click', () => {
  const allFigures = gallery.querySelectorAll('figure')
  for (figure in allFigures) {
    if (figure['data-category'] !== 1) {
      figure.remove()
    }
  }
})
console.log(figure)

const allBtn = document.querySelector('.btn-all')
allBtn.addEventListener('click', () => {
  gallery.innerHTML = '' // Vider la galerie
  getProjects() // Remplir encore
})
