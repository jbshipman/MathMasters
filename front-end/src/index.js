const usersURL = 'http://127.0.0.1:3000/users';
const questionsURL = 'http://127.0.0.1:3000/questions';

document.addEventListener('DOMContentLoaded', () => {
  userLogin();
});

// User Login
function userLogin() {
  const mainDiv = document.getElementById('main');
  mainDiv.innerHTML = '';

  // Header
  userHeader = document.createElement('h1');
  userHeader.innerText = 'Welcome to Mathmasters!';

  mainDiv.append(userHeader);

  fetchUsers();
}

function fetchUsers() {
  return fetch(usersURL)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
}
