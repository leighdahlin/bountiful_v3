const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const first_name = document.querySelector('#firstname-signup').value.trim();
    const last_name = document.querySelector('#lastname-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const location = document.querySelector('#location-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (first_name && last_name && username &&location && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, username, location, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
          //If all fields okay, take user to the dashboard page:
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If okay redirect to the dashboard page:
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
};

  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);