const usersURL = 'http://127.0.0.1:3000/users';
const questionsURL = 'http://127.0.0.1:3000/questions';
const mainDiv = document.getElementById('main');

document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
});

function fetchUsers() {
  return fetch(usersURL)
    .then((response) => response.json())
    .then((json) => {
      userLogin(json);
    });
}

// User Login
function userLogin(users) {
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
      renderUserProfile(user);
    });
  });
}

// Display User Profile
function renderUserProfile(user) {
  console.log(`${user.name}, ${user.id}`);
  const mainDiv = document.getElementById('main');
  mainDiv.innerHTML = '';

  // User Profile Header
  userHeader = document.createElement('h2');
  userHeader.innerText = `Nice to see you again, ${user.name}!`;
  mainDiv.append(userHeader);

  // Take New Test
  newTestInstructions = document.createElement('p');
  newTestInstructions.innerText = 'Would you like to take a new test?';
  mainDiv.append(newTestInstructions);

  // Test Button - Easy
  const easyTest = document.createElement('button');
  easyTest.innerText = 'Take Easy Test';
  easyTest.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Clicked easy test button');
    // TODO: Easy Test Function
  });

  // Test Button - Hard
  const hardTest = document.createElement('button');
  hardTest.innerText = 'Take Hard Test';
  hardTest.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Clicked hard test button');
    // TODO: Hard Test Function
  });
  mainDiv.append(easyTest);
  mainDiv.append(hardTest);

  // Display Test Results
  const userResultDiv = document.createElement('div');
  mainDiv.append(userResultDiv);
  const resultsText = document.createElement('p');
  resultsText.innerText = 'Your test results and scores:';
  userResultDiv.append(resultsText);
  displayResults(user);
  // TODO: Option to retake certain test?

  // Display Questions for Review
  const userReviewDiv = document.createElement('div');
  mainDiv.append(userReviewDiv);
  const reviewText = document.createElement('p');
  reviewText.innerText = 'Your marked questions for review:';
  userReviewDiv.append(reviewText);
  // TODO: Display reviewed questions
}

function displayResults(user) {
  console.log(user);
}
