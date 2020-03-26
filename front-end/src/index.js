const usersURL = 'http://127.0.0.1:3000/users';
const questionsURL = 'http://127.0.0.1:3000/questions';
const testResultsURL = 'http://127.0.0.1:3000/test_results';
const mainDiv = document.getElementById('main');

let testResult = {};
let currentResult;

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

  // New User Login Box
  const newUserTextArea = document.createElement('textarea');
  newUserTextArea.setAttribute('id', 'textarea');
  mainDiv.append(newUserTextArea);

  // Submit Button
  const submitBtn = document.createElement('button');
  submitBtn.innerText = 'Submit';
  submitBtn.setAttribute('id', 'submitBtn');
  submitBtn.addEventListener('click',
    (e) => {
      e.preventDefault();
      createUser();
    });
  mainDiv.append(submitBtn);

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
    el('user-result-div').innerHTML = '';
    el('user-review-div').innerHTML = '';
    console.log('Clicked easy test button');
    getEasyQuestions();
    // displayTestForm();
  });

  // Test Button - Hard
  const hardTest = document.createElement('button');
  hardTest.innerText = 'Take Hard Test';
  hardTest.addEventListener('click', (e) => {
    e.preventDefault();
    el('user-result-div').innerHTML = '';
    el('user-review-div').innerHTML = '';
    console.log('Clicked hard test button');
    getHardQuestions();
    // displayTestForm();
  });

  // append buttons
  profileDiv.append(easyTest);
  profileDiv.append(hardTest);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* create the div that will hold the ol */
  const testsDiv = document.createElement('div');
  testsDiv.setAttribute('id', 'test_questions_container');
  mainDiv.append(testsDiv);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

  // const easy = data.filter(filterEasyTests);
  const easyShuffled = data.sort(() => Math.random() - 0.5);
  const easy = easyShuffled.filter(filterEasyTests);
  const easyLimited = easy.slice(0, 5);

  /* create the ol */
  /* add to testsDiv */
  const testsOl = document.createElement('ol');
  testsOl.setAttribute('id', 'test_questions_list');
  el('test_questions_container').innerText = 'Easy test selected, select the answer';
  el('test_questions_container').append(testsOl);


  /* loop through data */
  /* to add questions to list */
  easyLimited.forEach(question => {
    // const theQuestion = question.text;
    // console.log(theQuestion);
    const questionLi = document.createElement('li');
    questionLi.setAttribute('id', question.id);
    questionLi.setAttribute('class', 'list-group-item');
    // questionLi.innerText = question.text;
    questionLi.innerHTML = `<h4 id="question-header-${question.id}">${question.text} = </h4>
    <ul>
      <li><button id="${question.id}-1" class="responsebuttons" value="${question.answer_key}" onclick="compareAnswer(this.value, this.innerText, this.id, ${question.id}, '${question.text}')">${question.option1}</button></li>
      <li><button id="${question.id}-2" class="responsebuttons" value="${question.answer_key}" onclick="compareAnswer(this.value, this.innerText, this.id, ${question.id}, '${question.text}')">${question.option2}</button></li>
      <li><button id="${question.id}-3" class="responsebuttons" value="${question.answer_key}" onclick="compareAnswer(this.value, this.innerText, this.id, ${question.id}, '${question.text}')">${question.option3}</button></li>
    </ul>
    Mark this question for review? <button id="${question.id}-review">yes</button>`;
    testsOl.appendChild(questionLi);
  });

  /* submit button */
  buildSubmitButton();
  // submitButton = document.createElement('button');
  // submitButton.setAttribute('id', 'submit');
  // submitButton.setAttribute('value', 'submit');
  // submitButton.setAttribute('onclick', 'sendTest()');
  // submitButton.innerText = 'Submit Test'
  // el('test_questions_list').append(submitButton);
  

  // /*event listener for buttons */
  // const buttons = document.querySelectorAll('.responsebuttons') 
  // // const answerKey = data
  // buttons.forEach((btn) => { 
  //   btn.addEventListener("click", (event) => { 
  //     console.log(`btn ${btn.id} clicked`);
  //     // console.log(`selected ${btn.value}`);
  //     // const answerChoice = btn.value;
  //   }); 
  // });

  /* append to the main div */
  if (!!el('test_questoins_list')) {
    el('test_questoins_list').innerHTML = '';
  };
  el('test_questions_container').append(testsOl);
};

function renderHardTestQuestions(data) {

  const hardShuffled = data.sort(() => Math.random() - 0.5);
  const hard = hardShuffled.filter(filterHardTests);
  const hardLimited = hard.slice(0, 5);

  /* create the ol */
  /* add to testsDiv */
  const testsOl = document.createElement('ol');
  testsOl.setAttribute('id', 'test_questions_list');
  el('test_questions_container').innerText = 'Hard test selected, select a, b, c';
  el('test_questions_container').append(testsOl);

  /* loop through data */
  /* to add questions to list */
  hardLimited.forEach(question => {
    // const theQuestion = question.text;
    // console.log(theQuestion);
    const questionLi = document.createElement('li');
    questionLi.setAttribute('id', question.id);
    questionLi.setAttribute('class', 'list-group-item');
    // questionLi.innerText = question.text;
    questionLi.innerHTML = `<h4 id="question-header-${question.id}">${question.text} = </h4>
      <ul>
        <li><button id="${question.id}-1" class="responsebuttons" value="${question.answer_key}" onclick="compareAnswer(this.value, this.innerText, this.id, ${question.id}, '${question.text}')">${question.option1}</button></li>
        <li><button id="${question.id}-2" class="responsebuttons" value="${question.answer_key}" onclick="compareAnswer(this.value, this.innerText, this.id, ${question.id}, '${question.text}')">${question.option2}</button></li>
        <li><button id="${question.id}-3" class="responsebuttons" value="${question.answer_key}" onclick="compareAnswer(this.value, this.innerText, this.id, ${question.id}, '${question.text}')">${question.option3}</button></li>
    </ul>
      Mark this question for review? <button id="${question.id}-review">yes</button>`;
    testsOl.appendChild(questionLi);
  });

  /* submit button */
  buildSubmitButton();


  // /*event listener for buttons */
  // const buttons = document.querySelectorAll('.responsebuttons') 
  // buttons.forEach((btn) => { 
  //   btn.addEventListener("click", (event) => { 
  //     console.log(`btn ${btn.id} clicked`);
  //     // alert(event.target); 
  //   }); 
  // });

  /* append to the main div */
  if (!!el('test_questoins_list')) {
    el('test_questoins_list').innerHTML = '';
  };
  el('test_questions_container').append(testsOl);

};

function filterEasyTests(data) {
  test = data.difficulty == false;
  // return limitTests(test);
  return test;
}

function filterHardTests(data) {
  test = data.difficulty == true;
  return test;
};

function limitTests(test) {
  test.slice(5);
  return test;
};

function compareAnswer(value, selection, buttonID, questionID, questionText) {
  console.log(`you selected: ${selection}`);
  console.log(`the answer is: ${value}`);
  console.log(`clicked button: ${buttonID}`);
  console.log(`question text: ${questionText}`);
  
  const answerEl = el(questionID);
  // const questionHeader = el(`question-header-${questionID}`);
  // console.log(answerEl);
  // console.log(questionHeader);

  if (value === selection) {
    console.log('CORRECT');
    currentResult = 'correct';
    testResult[`${questionID}`] = 'correct';
    // result.push('correct');
    // questionHeader.insertAdjacentText("beforeend", `${selection} is ${currentResult}`);
    answerEl.setAttribute('style', 'background-color: #4caf50');
  } else {
    console.log('WRONG');
    currentResult = 'wrong';
    testResult[`${questionID}`] = 'wrong';
    // result.push('wrong');
    // questionHeader.innerText = `${questionText} = ${selection} is ${result}`;
    // questionHeader.insertAdjacentText("beforeend", `${selection} is ${currentResult}`);
    answerEl.setAttribute('style', 'background-color: #EF5353');
  };
  console.log(testResult);
  return testResult;
};

function buildSubmitButton() {
  submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submit');
  submitButton.setAttribute('value', 'submit');
  submitButton.setAttribute('onclick', 'sendTest(testResult)');
  submitButton.innerText = 'Submit Test'
  el('test_questions_list').append(submitButton);
};

function sendTest(testResult) {
  // console.log(testResult);


  alert(`Test submitted`);
};

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
