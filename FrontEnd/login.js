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
