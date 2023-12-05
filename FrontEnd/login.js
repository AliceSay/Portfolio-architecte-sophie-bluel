document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('form')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const badLogin = document.querySelector('#error-message')

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
      let responseData = await response.json()

      if (response.status === 200) {
        localStorage.setItem('token de connexion', responseData.token)
        document.location.href =
          'file:///C:/Users/alice/Desktop/Projet6-OC/Portfolio-architecte-sophie-bluel/FrontEnd/index.html'
      } else {
        throw new Error('mot de passe incorrect !')
      }
    } catch (error) {
      console.log(error)
      badLogin.style.display = 'block'
    }
  })
  const content = document.getElementById('content')
  const loginBtn = document.querySelector('.login')
  const logoutBtn = document.querySelector('.logout')
  const filters = document.querySelector('.filters')

  function login() {
    content.style.display = 'none'
    logoutBtn.style.display = 'none'
    loginForm.style.display = 'block'
  }

  function logout() {
    localStorage.removeItem('token de connexion')
    content.style.display = 'block'
    loginBtn.style.display = 'none'
    loginForm.style.display = 'none'
    filters.style.display = 'none'
  }
})
