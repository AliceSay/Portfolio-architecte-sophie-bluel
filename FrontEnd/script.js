// récupération des travaux

const gallery = document.getElementById('gallery')

const urlWorks = 'http://localhost:5678/api/works'

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

// BOUTON OBJETS

const btnObjects = document.querySelector('.btn-objects')
btnObjects.addEventListener('click', () => {
  const figures = Array.from(gallery.querySelectorAll('#gallery figure'))
  const figuresObjects = figures.filter(function (figure) {
    if (figure.getAttribute('data-category') === '1') {
      return true
    } else {
      return false
    }
  })
  gallery.innerHTML = ''
  figuresObjects.forEach((figure) => {
    gallery.appendChild(figure)
  })
})

// BOUTON APPARTEMENTS

const btnAppts = document.querySelector('.btn-appartements')
btnAppts.addEventListener('click', () => {
  const figures = Array.from(gallery.querySelectorAll('#gallery figure'))
  const figuresAppts = figures.filter(function (figure) {
    if (figure.getAttribute('data-category') === '2') {
      return true
    } else {
      return false
    }
  })
  gallery.innerHTML = ''
  figuresAppts.forEach((figure) => {
    gallery.appendChild(figure)
  })
})

// BOUTON HOTELS&RESAURANTS

const btnHotelsAndRests = document.querySelector('.btn-hotels-restaurants')
btnHotelsAndRests.addEventListener('click', () => {
  const figures = Array.from(gallery.querySelectorAll('#gallery figure'))
  const figuresHotelsAndRests = figures.filter(function (figure) {
    if (figure.getAttribute('data-category') === '3') {
      return true
    } else {
      return false
    }
  })
  gallery.innerHTML = ''
  figuresHotelsAndRests.forEach((figure) => {
    gallery.appendChild(figure)
  })
})

// BOUTON ALL

const btnAll = document.querySelector('.btn-all')
btnAll.addEventListener('click', () => {
  gallery.innerHTML = ''
  getProjects()
})
