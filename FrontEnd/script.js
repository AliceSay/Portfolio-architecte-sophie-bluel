// récupération des travaux

const urlWorks = 'http://localhost:5678/api/works'
const gallery = document.getElementById('gallery')

// Remplir la gallery
const getProjects = () => {
  fetch(urlWorks)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      for (element of data) {
        gallery.innerHTML += `<figure data-category="${element.categoryId}">
                                <img src="${element.imageUrl}" alt="${element.imageUrl}">
                                <figcaption>${element.title}</figcaption>
                              </figure>`
      }
    })
}

getProjects()

// tri des travaux

const btnObjects = document.querySelector('.btn-objects')
btnObjects.addEventListener('click', () => {
  const figures = Array.from(gallery.querySelectorAll('#gallery figure'))
  // console.log(figures) = Array : toutes les figures (11)
  console.log(figures)

  const figuresObjects = figures.filter(function (figure) {
    if (figure.getAttribute('data-category') === '1') {
      return true
    } else {
      return false
    }
  })
  console.log(figuresObjects)
  // console.log(figuresObjects) = Array : figures avec "data-category 1"
})
