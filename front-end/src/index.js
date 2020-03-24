const usersURL = 'http://127.0.0.1:3000/users';
const questionsURL = 'http://127.0.0.1:3000/questions';

document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
});

// User Login
function userLogin(users) {
//   console.log(users);

  const mainDiv = document.getElementById('main');
  mainDiv.innerHTML = '';

  // Header
  userHeader = document.createElement('h1');
  userHeader.innerText = 'Welcome to Mathmasters!';
  mainDiv.append(userHeader);

  // User Instructions
  const userInstructions = document.createElement('p');
  userInstructions.innerText = 'Select a user from the list below to login';
  mainDiv.append(userInstructions);

  // User List
  const userList = document.createElement('ul');
  mainDiv.append(userList);
  users.forEach((user) => {
    const userLi = document.createElement('li');
    userLi.innerText = user.name;
    userList.appendChild(userLi);
    userLi.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Clicked ${user.name} profile, id:${user.id}`);
      renderUserProfile(user);
    });
  });
}

function fetchUsers() {
  return fetch(usersURL)
    .then((response) => response.json())
    .then((json) => {
      userLogin(json);
    });
}
