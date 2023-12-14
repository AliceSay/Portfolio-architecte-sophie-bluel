document.addEventListener('DOMContentLoaded', async function () {
  const loginForm = document.querySelector('form')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const badLogin = document.querySelector('#error-message')

  function updateVisibility(isConnected) {
    const contentDiv = document.querySelector('.content')
    const logoutLink = document.querySelector('.logout')
    const iconModifierDiv = document.querySelector('.icon-modifier')
    const loginLink = document.querySelector('.login')
    const filtersDiv = document.querySelector('.filters')

    if (isConnected) {
      // Utilisateur connecté : affichage des éléments
      contentDiv.classList.remove('hidden')
      logoutLink.style.display = 'block'
      iconModifierDiv.classList.remove('hidden')
      loginLink.classList.add('hidden')
      filtersDiv.classList.add('hidden')
    } else {
      // Utilisateur non connecté : affichage des éléments
      contentDiv.classList.add('hidden')
      logoutLink.classList.add('hidden')
      iconModifierDiv.classList.add('hidden')
      loginLink.classList.remove('hidden')
      filtersDiv.classList.remove('hidden')
    }
  }
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const data = {
      email: email.value,
      password: password.value,
    }

    try {
      let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        let responseData = await response.json()

        localStorage.setItem('token de connexion', responseData.token)
        updateVisibility(true)

        document.location.href = 'index.html'
      } else {
        console.error('Échec de la connexion:', await response.text())
        throw new Error('mot de passe incorrect !')
      }
    } catch (error) {
      badLogin.style.display = 'block'
    }
  })
  let editionMode = localStorage.getItem('token de connexion')
  const isUserConnected = !!editionMode
  updateVisibility(isUserConnected)

  //       // rebascule en mode public au clic sur logout
  const logoutLink = document.querySelector('.logout')
  logoutLink.addEventListener('click', () => {
    //         // supprime le token de connexion du localstorage
    localStorage.removeItem('token de connexion')
    //         // met à jour la visibilité en mode no connecté
    updateVisibility(false)
  })
})
