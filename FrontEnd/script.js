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

// BOUTON OBJETS

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

  // on vide la gallerie et on la re-remplie avec les images "objets"

  gallery.innerHTML = ''

  figuresObjects.forEach((element) => {
    const imgObjectOne = document.createElement('img')

    imgObjectOne.setAttribute(
      'src',
      'http://localhost:5678/images/abajour-tahina1651286843956.png'
    )
    imgObjectOne.setAttribute(
      'alt',
      'http://localhost:5678/images/abajour-tahina1651286843956.png'
    )
    gallery.appendChild(imgObjectOne)

    const imgObjectTwo = document.createElement('img')
    imgObjectTwo.setAttribute(
      'src',
      'http://localhost:5678/images/structures-thermopolis1651287380258.png'
    )
    imgObjectTwo.setAttribute(
      'alt',
      'http://localhost:5678/images/structures-thermopolis1651287380258.png'
    )
    gallery.appendChild(imgObjectTwo)

    // présence de doublon, utiliser Set ?

    const objectsSet = new Set[(imgObjectOne, imgObjectTwo)]()

    // erreur dans la console : Set[imgObjectTwo] is not a constructor
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
  console.log(figuresAppts)
  // console.log(figuresAppts) = Array : figures avec "data-category 2"

  // on vide la gallerie et on la re-remplie avec les images "Appartements"

  gallery.innerHTML = ''
  figuresAppts.forEach((element) => {
    const imgApptOne = document.createElement('img')

    imgApptOne.setAttribute(
      'src',
      'http://localhost:5678/images/appartement-paris-v1651287270508.png'
    )
    imgApptOne.setAttribute(
      'alt',
      'http://localhost:5678/images/appartement-paris-v1651287270508.png'
    )
    gallery.appendChild(imgApptOne)

    const imgApptTwo = document.createElement('img')
    imgApptTwo.setAttribute(
      'src',
      'http://localhost:5678/images/la-balisiere1651287350102.png'
    )
    imgApptTwo.setAttribute(
      'alt',
      'http://localhost:5678/images/la-balisiere1651287350102.png'
    )
    gallery.appendChild(imgApptTwo)

    const imgApptThree = document.createElement('img')
    imgApptThree.setAttribute(
      'src',
      'http://localhost:5678/images/appartement-paris-x1651287435459.png'
    )
    imgApptThree.setAttribute(
      'alt',
      'http://localhost:5678/images/appartement-paris-x1651287435459.png'
    )
    gallery.appendChild(imgApptThree)

    const imgApptFour = document.createElement('img')
    imgApptFour.setAttribute(
      'src',
      'http://localhost:5678/images/le-coteau-cassis1651287469876.png'
    )
    imgApptFour.setAttribute(
      'alt',
      'http://localhost:5678/images/le-coteau-cassis1651287469876.png'
    )
    gallery.appendChild(imgApptFour)

    const imgApptFive = document.createElement('img')
    imgApptFive.setAttribute(
      'src',
      'http://localhost:5678/images/villa-ferneze1651287511604.png'
    )
    imgApptFive.setAttribute(
      'alt',
      'http://localhost:5678/images/villa-ferneze1651287511604.png'
    )
    gallery.appendChild(imgApptFive)

    const imgApptSix = document.createElement('img')
    imgApptSix.setAttribute(
      'src',
      'http://localhost:5678/images/appartement-paris-xviii1651287541053.png'
    )
    imgApptSix.setAttribute(
      'alt',
      'http://localhost:5678/images/appartement-paris-xviii1651287541053.png'
    )

    gallery.appendChild(imgApptSix)

    // présence de doublon, utiliser Set ?

    const ApptsSet = new Set[
      (imgApptOne,
      imgApptTwo,
      imgApptThree,
      imgApptFour,
      imgApptFive,
      imgApptSix)
    ]()

    // erreur dans la console : Set[imgApptSix] is not a constructor
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
  console.log(figuresHotelsAndRests)
  // console.log(figuresObjects) = Array : figures avec "data-category 3"

  // on vide la gallerie et on la re-remplie avec les images "Hotels&Rests"

  gallery.innerHTML = ''
  figuresHotelsAndRests.forEach((element) => {
    const imgHotelOne = document.createElement('img')

    imgHotelOne.setAttribute(
      'src',
      'http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png'
    )
    imgHotelOne.setAttribute(
      'alt',
      'http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png'
    )

    gallery.appendChild(imgHotelOne)

    const imgHotelTwo = document.createElement('img')
    imgHotelTwo.setAttribute(
      'src',
      'http://localhost:5678/images/bar-lullaby-paris1651287567130.png'
    )
    imgHotelTwo.setAttribute(
      'alt',
      'http://localhost:5678/images/bar-lullaby-paris1651287567130.png'
    )
    gallery.appendChild(imgHotelTwo)

    const imgHotelThree = document.createElement('img')
    imgHotelThree.setAttribute(
      'src',
      'http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png'
    )
    imgHotelThree.setAttribute(
      'alt',
      'http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png'
    )
    gallery.appendChild(imgHotelThree)

    // présence de doublon, utiliser Set ?

    const HotelsAndRestaurantsSet = new Set[
      (imgHotelOne, imgHotelTwo, imgHotelThree)
    ]()

    // erreur dans la console : Set[imgHotelThree] is not a constructor
  })
})

// BOUTON ALL

const btnAll = document.querySelector('.btn-all')
btnAll.addEventListener('click', () => {
  gallery.innerHTML = ''

  getProjects()
})
