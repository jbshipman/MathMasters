/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// TODO: clear innerHTML of test display if there is a test displayed
// TODO: randomly select 5 questions to display


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
  userInstructions.innerText = 'Create a new user or, select a user from the menu below to login';
  instructionsDiv.append(userInstructions);
  container.append(userInstructions);
  mainDiv.append(container);

  // New User Login Box
  const userForm = document.createElement('div');
  userForm.setAttribute('class', 'form-group');

  const userLabel = document.createElement('label');
  userLabel.setAttribute('for', 'textarea');
  userLabel.innerText = 'New User:';
  userForm.append(userLabel);

  const userInput = document.createElement('input');
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('class', 'form-control');
  userInput.setAttribute('id', 'textarea');
  userForm.append(userInput);

  container.append(userForm);

  // Submit Button
  const submitBtn = document.createElement('button');
  submitBtn.setAttribute('id', 'submitBtn');
  submitBtn.setAttribute('type', 'button');
  submitBtn.setAttribute('class', 'btn btn-primary');
  submitBtn.innerText = 'Submit';
  submitBtn.addEventListener('click',
    (e) => {
      e.preventDefault();
      createUser();
    });
  userForm.append(submitBtn);

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
  container.append(userDropdown);
}

// Create New User POST
function createUser() {
  const newUserTextArea = document.getElementById('textarea');
  const newUser = {
    method: 'POST',
    headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
    body: JSON.stringify({
      name: newUserTextArea.value,
    }),
  };
  fetch('http://127.0.0.1:3000/users', newUser);
  showNewUser();
}

// Displays Profile Page for New User
function showNewUser() {
  const userArray = [];
  return fetch(usersURL)
    .then((response) => response.json())
    .then((json) => {
      userArray.push(json);
      const lastUser = userArray[0].slice(-1)[0];
      renderUserProfile(lastUser);
      const userHeader = document.getElementById('userheader');
      userHeader.innerText = `Hello, ${lastUser.name}`;
    });
}

// Display User Profile
function renderUserProfile(user) {
  const profileDiv = document.createElement('div');
  profileDiv.setAttribute('id', 'profile-header-container');
  mainDiv.innerHTML = '';
  mainDiv.append(profileDiv);

  // User Profile Header
  const headerDiv = document.createElement('div');
  headerDiv.setAttribute('class', 'jumbotron text-center');
  const userHeader = document.createElement('h2');
  userHeader.setAttribute('id', 'userheader');
  userHeader.innerText = `Nice to see you again, ${user.name}!`;
  headerDiv.append(userHeader);
  mainDiv.append(headerDiv);

  // Take New Test
  newTestInstructions = document.createElement('p');
  newTestInstructions.innerText = 'Would you like to take a new test?';
  profileDiv.append(newTestInstructions);

  // Test Button - Easy
  const easyTest = document.createElement('button');
  easyTest.innerText = 'Take Easy Test';
  easyTest.addEventListener('click', (e) => {
    e.preventDefault();
    getEasyQuestions();
  });

  // Test Button - Hard
  const hardTest = document.createElement('button');
  hardTest.innerText = 'Take Hard Test';
  hardTest.addEventListener('click', (e) => {
    e.preventDefault();
    getHardQuestions();
  });

  profileDiv.append(easyTest);
  profileDiv.append(hardTest);

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getEasyQuestions() {
  fetch(questionsURL)
    .then((res) => res.json())
    .then((data) => renderEasyTestQuestions(data));
}

function getHardQuestions() {
  fetch(questionsURL)
    .then((res) => res.json())
    .then((data) => renderHardTestQuestions(data));
}

function renderEasyTestQuestions(data) {
  const easy = data.filter(filterEasyTests);

  /* create the div that will hold the ol */
  const testsDiv = document.createElement('div');
  testsDiv.setAttribute('id', 'test_questions_container');
  testsDiv.innerText = 'Easy test has been selected';

  /* create the ol */
  /* add to testsDiv */
  const testsOl = document.createElement('ol');
  testsOl.setAttribute('id', 'test_questions_list');
  testsDiv.append(testsOl);

  /* loop through data */
  /* to add questions to list */
  easy.forEach((question) => {
    const questionLi = document.createElement('li');
    questionLi.setAttribute('id', question.id);
    questionLi.setAttribute('class', 'list-group-item');
    questionLi.innerText = question.text;
    testsOl.appendChild(questionLi);
  });

  /* append to the main div */
  el('main').append(testsDiv);
}

function renderHardTestQuestions(data) {
  const hard = data.filter(filterHardTests);

  // el('test_questions_container').innerHTML = '';

  /* create the div that will hold the ol */
  const testsDiv = document.createElement('div');
  testsDiv.setAttribute('id', 'test_questions_container');
  testsDiv.innerText = 'Easy test has been selected';

  /* create the ol */
  /* add to testsDiv */
  const testsOl = document.createElement('ol');
  testsOl.setAttribute('id', 'test_questions_list');
  testsDiv.append(testsOl);

  /* loop through data */
  /* to add questions to list */
  hard.forEach((question) => {
    const questionLi = document.createElement('li');
    questionLi.setAttribute('id', question.id);
    questionLi.setAttribute('class', 'list-group-item');
    questionLi.innerText = question.text;
    testsOl.appendChild(questionLi);
  });

  /* append to the main div */
  el('main').append(testsDiv);
}

function filterEasyTests(data) {
  test = data.difficulty === false;
  // console.log(data);
  // return shuffle(data);
  return test;
}

function filterHardTests(data) {
  return data.difficulty === true;
}

function shuffle(test) {
  // shuffle given array of tests
  console.log(test);
  return test;
}

// ~~~~~~~~~~~~~~~~~~~~~~~


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

function el(id) {
  return document.getElementById(id);
}
