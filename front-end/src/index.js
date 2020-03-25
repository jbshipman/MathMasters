const usersURL = 'http://127.0.0.1:3000/users';
const questionsURL = 'http://127.0.0.1:3000/questions';
const testResultsURL = 'http://127.0.0.1:3000/test_results';
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
  const headerDiv = document.createElement('div');
  headerDiv.setAttribute('class', 'jumbotron text-center');
  const userHeader = document.createElement('h1');
  userHeader.innerText = 'Welcome to Mathmasters!';
  headerDiv.append(userHeader);
  mainDiv.append(headerDiv);

  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  // User Instructions
  const instructionsDiv = document.createElement('div');
  // instructionsDiv.setAttribute('class', '');
  const userInstructions = document.createElement('p');
  userInstructions.innerText = 'Select a user from the list below to login';
  instructionsDiv.append(userInstructions);
  container.append(userInstructions);

  // User List
  const userDropdown = document.createElement('div');
  userDropdown.setAttribute('class', 'dropdown');

  const userDropBtn = document.createElement('div');
  userDropBtn.setAttribute('class', 'btn btn-primary dropdown-toggle');
  userDropBtn.setAttribute('type', 'button');
  userDropBtn.setAttribute('data-toggle', 'dropdown');
  userDropBtn.innerText = 'Users';

  userDropdown.append(userDropBtn);

  const userList = document.createElement('ul');
  userList.setAttribute('class', 'dropdown-menu');
  userDropdown.append(userList);
  users.forEach((user) => {
    const userLi = document.createElement('li');
    userLi.innerText = user.name;
    userList.appendChild(userLi);
    userLi.addEventListener('click', (e) => {
      e.preventDefault();
      renderUserProfile(user);
    });
  });
  main.append(userDropdown);
}

// Display User Profile
function renderUserProfile(user) {
  mainDiv.innerHTML = '';

  // User Profile Header
  const headerDiv = document.createElement('div');
  headerDiv.setAttribute('class', 'jumbotron text-center');
  const userHeader = document.createElement('h2');
  userHeader.innerText = `Nice to see you again, ${user.name}!`;
  headerDiv.append(userHeader);
  mainDiv.append(headerDiv);

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

  // Create Test Results Elements
  const userResultDiv = document.createElement('div');
  userResultDiv.setAttribute('id', 'user-result-div');
  mainDiv.append(userResultDiv);
  const resultsText = document.createElement('p');
  resultsText.innerText = 'Your test results and scores:';
  userResultDiv.append(resultsText);
  fetchTestResults(user);
  // TODO: Option to retake certain test?

  // Create Reviewed Questions Elements
  const userReviewDiv = document.createElement('div');
  userReviewDiv.setAttribute('id', 'user-review-div');
  mainDiv.append(userReviewDiv);
  const reviewText = document.createElement('p');
  reviewText.innerText = 'Your marked questions for review:';
  userReviewDiv.append(reviewText);
  fetchQuestions(user);
}

function fetchTestResults(user) {
  return fetch(testResultsURL)
    .then((response) => response.json())
    .then((json) => {
      selectUserResults(user, json);
    });
}

// Selects Individual User Results from JSON Fetch
function selectUserResults(user, results) {
  userResults = [];
  results.forEach((result) => {
    if (result.user_id === user.id) userResults.push(result);
    displayResults(userResults);
  });
}

// Displays Individual User Test Results
function displayResults(userResults) {
  const testUl = document.createElement('ul');
  const userResultDiv = document.getElementById('user-result-div');
  userResultDiv.append(testUl);
  userResults.forEach((result) => {
    const resultLi = document.createElement('li');
    resultLi.innerText = `Test Session ${result.id} - Score: ${result.test_score}`;
    testUl.appendChild(resultLi);
  });
}

// Fetch Questions from UserQuestions for Individual User
function fetchQuestions(user) {
  return fetch(`http://127.0.0.1:3000/users/${user.id}/questions`)
    .then((response) => response.json())
    .then((json) => {
      selectReviewQuestions(json);
    });
}

// Select Questions where Review Marked as True
function selectReviewQuestions(questions) {
  reviewQuestions = [];
  questions.forEach((question) => {
    if (question.review === true) reviewQuestions.push(question);
  });
  displayReviewQuestions(reviewQuestions);
}

// Display Review Questions
function displayReviewQuestions(questions) {
  const reviewUl = document.createElement('ul');
  const userReviewDiv = document.getElementById('user-review-div');
  userReviewDiv.append(reviewUl);
  questions.forEach((question) => {
    const questionLi = document.createElement('li');
    questionLi.innerText = `Question #${question.id}`;
    const questionText = document.createElement('p');
    questionText.innerText = `${question.text}`;
    reviewUl.appendChild(questionLi);
    reviewUl.append(questionText);
  });
}
