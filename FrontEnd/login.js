document.addEventListener('DOMContentLoaded', async function () {
  const loginForm = document.querySelector('form')
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const badLogin = document.getElementById('error-message')

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
        console.log('Response status:', response.status)
        console.log('Response data:', responseData) /
          localStorage.setItem('token', responseData.token)

        document.location.href = 'index.html'
      } else {
        throw new Error('identifiants incorrects !')
      }
    } catch (error) {
      badLogin.style.display = 'block'
    }
  })
})
// const url = 'http://localhost:5678/api/users/login'
// async function login() {
//   const email = document.querySelector('input#email').value
//   const password = document.querySelector('input#password').value
//   try {
//     const reponse = await fetch(url, {
//       method: 'POST',
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//       headers: {
//         accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     }).then((response) => response.json())
//     const token = reponse.token
//     if (token) {
//       window.localStorage.setItem('token', token)
//       document.location.href = 'index.html'
//     } else if (email === '' || password === '') {
//       alert('Renseigner votre e-mail et votre mdp !')
//     } else {
//       alert("Erreur dans l'identifiant ou le mot de passe")
//     }
//   } catch (err) {
//     alert('Le serveur ne répond pas !')
//   }
// }

// const btnSeConnecter = document.querySelector('input#seConnecter')
// btnSeConnecter.addEventListener('click', (event) => {
//   event.preventDefault()
//   login()
// })
