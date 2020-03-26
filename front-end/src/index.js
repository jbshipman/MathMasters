const usersURL = 'http://127.0.0.1:3000/users';
const questionsURL = 'http://127.0.0.1:3000/questions';
const testResultsURL = 'http://127.0.0.1:3000/test_results';
// const questionUpdate = 'http://localhost:3000/questions/:id';
const mainDiv = document.getElementById('main');
const body = document.querySelector('body');

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
  mainDiv.innerHTML = '';
  // User Profile Header
  const headerDiv = document.createElement('div');
  headerDiv.setAttribute('class', 'jumbotron text-center');
  const userHeader = document.createElement('h2');
  userHeader.setAttribute('id', 'userheader');
  userHeader.innerText = `Nice to see you again, ${user.name}!`;
  headerDiv.append(userHeader);
  mainDiv.append(headerDiv);

  const testContainer = document.createElement('div');
  testContainer.setAttribute('class', 'container');
  mainDiv.append(testContainer);



  // Take New Test
  const newTestInstructions = document.createElement('p');
  newTestInstructions.innerText = 'Would you like to take a new test?';
  testContainer.append(newTestInstructions);

  const buttonGroup = document.createElement('div');
  buttonGroup.setAttribute('class', 'btn-group');
  testContainer.append(buttonGroup);

  // Test Button - Easy
  const easyTest = document.createElement('button');
  easyTest.setAttribute('type', 'button');
  easyTest.setAttribute('class', 'btn btn-primary');
  easyTest.innerText = 'Take Easy Test';
  easyTest.addEventListener('click', (e) => {
    e.preventDefault();
    el('user-result-div').innerHTML = '';
    console.log('Clicked easy test button');
    getEasyQuestions();
    // displayTestForm();
  });

  // Test Button - Hard
  const hardTest = document.createElement('button');
  hardTest.setAttribute('type', 'button');
  hardTest.setAttribute('class', 'btn btn-primary');
  hardTest.innerText = 'Take Hard Test';
  hardTest.addEventListener('click', (e) => {
    e.preventDefault();
    el('user-result-div').innerHTML = '';
    console.log('Clicked hard test button');
    getHardQuestions();
    // displayTestForm();
  });

  // append buttons
  buttonGroup.append(easyTest);
  buttonGroup.append(hardTest);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /* create the div that will hold the ol */
  const testsDiv = document.createElement('div');
  testsDiv.setAttribute('id', 'test_questions_container');
  testContainer.append(testsDiv);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Create Test Results Elements
  const userResultDiv = document.createElement('div');
  userResultDiv.setAttribute('id', 'user-result-div');
  testContainer.append(userResultDiv);
  const resultsText = document.createElement('p');
  resultsText.innerText = 'Your test results and scores:';
  userResultDiv.append(resultsText);
  fetchTestResults(user);
  // TODO: Option to retake certain test?

  // Create Reviewed Questions Elements
  const userReviewDiv = document.createElement('div');
  userReviewDiv.setAttribute('id', 'user-review-div');
  testContainer.append(userReviewDiv);
  const reviewText = document.createElement('p');
  reviewText.innerText = 'Your marked questions for review:';
  userReviewDiv.append(reviewText);
  fetchQuestions(user);

  // Add Options for Editing at Bottom of Page
  addOptions(user);
  editQuestion();
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
    Mark this question for review? <button id="${question.id}-review" value="'${question.review}'", onclick="reviewThisQuestion(${question.id}, this.value)">yes</button>`;
    testsOl.appendChild(questionLi);
  });

  /* submit button */
  buildSubmitButton();

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
    Mark this question for review? <button id="${question.id}-review" value="'${question.review}'", onclick="reviewThisQuestion(${question.id}, this.value)">yes</button>`;
    testsOl.appendChild(questionLi);
  });

  /* submit button */
  buildSubmitButton();

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

function reviewThisQuestion(questionID, value) {
  let toReview = value;
  toReview = true;
  console.log(`question ${questionID} marked for review`, toReview);
  const answerEl = el(questionID);
  answerEl.setAttribute('style', 'background-color: #ffd54f');
   
  // update DOM with this question listed for review

  // send to POST directly
  fetch(`http://127.0.0.1:3000/questions/${questionID}`, {
    method: 'PATCH',
    body: JSON.stringify({review: toReview}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
};

function compareAnswer(value, selection, buttonID, questionID, questionText) {
  console.log(`you selected: ${selection}`);
  console.log(`the answer is: ${value}`);
  console.log(`clicked button: ${buttonID}`);
  console.log(`question text: ${questionText}`);
  
  const answerEl = el(questionID);
  if (value === selection) {
    console.log('CORRECT');
    currentResult = 20;
    testResult[`${questionID}`] = currentResult;
    answerEl.setAttribute('style', 'background-color: #4caf50');
  } else {
    console.log('WRONG');
    currentResult = 0;
    testResult[`${questionID}`] = currentResult;
    answerEl.setAttribute('style', 'background-color: #EF5353');
  };
  console.log(testResult);
  return testResult;
};

function buildSubmitButton() {
  submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submit');
  submitButton.setAttribute('value', 'submit');
  submitButton.setAttribute('onclick', 'getTestScore(testResult)');
  submitButton.innerText = 'Submit Test'
  el('test_questions_list').append(submitButton);
};

function getTestScore(testResult) {
  // reduces values of testResults for a test score
  const testScore = Object.values(testResult).reduce((t, n) => t + n);
  console.log(testScore);

  //  POST testScore to user, testResults to questions
  fetch(testResultsURL, {
    method: 'POST',
    body: JSON.stringify({test_score: testResult}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  alert('test submitted');
  // clear DOM and display selectUserResults with past results
  
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

// Add Options Div and Buttons
function addOptions(user) {
  const navBar = document.getElementById('navBar');
  // options navigation bar
  // const optionsNavBar = document.createElement('nav');
  // optionsNavBar.setAttribute('class', 'navbar navbar-inverse navbar-fixed-top');
  // navBarDiv.append(optionsNavBar);

  const containerFluid = document.createElement('div');
  containerFluid.setAttribute('class', 'container-fluid');
  navBar.append(containerFluid);

  const barheader = document.createElement('div');
  barheader.setAttribute('class', 'navbar-header');
  containerFluid.append(barheader);

  const a = document.createElement('a');
  a.setAttribute('class', 'navbar-brand');
  // a.setAttribute('href', '#');
  a.innerText = 'user options';
  barheader.append(a);

  // const navUl = document.createElement('ul');
  // navUl.setAttribute('class', 'nav navbar-nav');
  // containerFluid.append(navUl);


  // Edit User Button
  const editUserBtn = document.createElement('button');
  editUserBtn.setAttribute('id', 'editUserBtn');
  editUserBtn.setAttribute('type', 'button');
  editUserBtn.setAttribute('class', 'btn btn-warning');
  editUserBtn.innerText = 'Edit User';
  editUserBtn.addEventListener('click',
    (e) => {
      e.preventDefault();
      editUser(user);
    });
  containerFluid.append(editUserBtn);

  // Delete User Button
  const deleteUserBtn = document.createElement('button');
  deleteUserBtn.setAttribute('id', 'deleteUserBtn');
  deleteUserBtn.setAttribute('type', 'button');
  deleteUserBtn.setAttribute('class', 'btn btn-danger');
  deleteUserBtn.innerText = 'Delete User';
  deleteUserBtn.addEventListener('click',
    (e) => {
      e.preventDefault();
      deleteUser(user);
    });
  containerFluid.append(deleteUserBtn);

}

// Adds div, Text Area, and Button to Submit New Username
function editUser(user) {
  const editDiv = document.createElement('div');
  mainDiv.append(editDiv);

  const editBox = document.createElement('textarea');
  editBox.setAttribute('id', 'usertextarea');
  const confirmEditBtn = document.createElement('button');
  confirmEditBtn.setAttribute('type', 'button');
  confirmEditBtn.setAttribute('class', 'btn btn-primary');
  confirmEditBtn.innerText = 'Confirm New Username';
  editDiv.append(editBox);
  editDiv.append(confirmEditBtn);

  confirmEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    updateUser(user);
  });
}

// Function to send PATCH to update user in backend
function updateUser(user) {
  const usernameTextArea = document.getElementById('usertextarea');
  const editUser = {
    method: 'PATCH',
    headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': false,
          },
    body: JSON.stringify({
      id: user.id,
      name: usernameTextArea.value,
    }),
  };
  fetch(`http://127.0.0.1:3000/users/${user.id}`, editUser);
  // TODO - Fix user in list not updating until hard refresh of browser window
  fetchUsers();
}

function deleteUser(user) {
  const removeUser = {
    method: 'DELETE',
    headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': false,
          },
    body: JSON.stringify({
      id: user.id,
    }),
  };
  fetch(`http://127.0.0.1:3000/users/${user.id}`, removeUser);
  // TODO - Fix user in list still displaying until hard refresh of browser window
  fetchUsers();
}

// Creates Edit Questions Button in OptionsDiv
function editQuestion() {
  const optionsDiv = document.getElementById('optionsdiv');

  const editQuestionsBtn = document.createElement('button');
  editQuestionsBtn.setAttribute('type', 'button');
  editQuestionsBtn.setAttribute('class', 'btn btn-primary');
  editQuestionsBtn.innerText = 'Edit Questions';
  optionsDiv.append(editQuestionsBtn);

  editQuestionsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetchAllQuestions();
  });
}

function fetchAllQuestions() {
  return fetch('http://127.0.0.1:3000/questions')
    .then((response) => response.json())
    .then((json) => {
      displayQuestions(json);
    });
}

// Displays List of Questions and Edit Buttons
function displayQuestions(questions) {
  const questionsDiv = document.createElement('div');
  questionsDiv.setAttribute('id', 'questionsdiv');
  mainDiv.append(questionsDiv);
  questionUl = document.createElement('ul');
  questionsDiv.append(questionUl);

  questions.forEach((question) => {
    const questionLi = document.createElement('li');
    questionLi.innerHTML = `Question #${question.id} <br> ${question.text}`;
    questionUl.appendChild(questionLi);
    const editIndQuestion = document.createElement('button');
    editIndQuestion.setAttribute('id', 'editindquestion');
    editIndQuestion.innerText = 'Edit';
    editIndQuestion.setAttribute('class', 'btn btn-primary');
    questionLi.append(editIndQuestion);
    editIndQuestion.addEventListener('click', (e) => {
      e.preventDefault();
      indQuestionEdit(question);
    });
  });
}

function indQuestionEdit(question) {
  const questionsDiv = document.getElementById('questionsdiv');
  const questionOptionsDiv = document.createElement('div');
  questionOptionsDiv.setAttribute('id', 'questionoptionsdiv');
  const answerDiv = document.createElement('div');
  answerDiv.setAttribute('id', 'answerdiv');
  const buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('id', 'buttondiv');
  questionsDiv.innerHTML = '';

  // Question Text
  const questionText = document.createElement('textarea');
  questionText.setAttribute('id', 'questiontext');
  questionText.innerHTML = question.text;

  // Question Option 1
  const questionOption1 = document.createElement('textarea');
  questionOption1.setAttribute('id', 'questionoption1');
  questionOption1.innerText = question.option1;

  // Question Option 2
  const questionOption2 = document.createElement('textarea');
  questionOption2.setAttribute('id', 'questionoption2');
  questionOption2.innerText = question.option2;

  // Question Option 3
  const questionOption3 = document.createElement('textarea');
  questionOption3.setAttribute('id', 'questionoption3');
  questionOption3.innerText = question.option3;

  // Answer
  const answer = document.createElement('textarea');
  answer.setAttribute('id', 'answertextarea');
  answer.innerText = question.answer_key;

  // Edit Question Submit Button
  const editQuestionBtn = document.createElement('button');
  editQuestionBtn.setAttribute('id', 'editQuestionBtn');
  editQuestionBtn.setAttribute('type', 'button');
  editQuestionBtn.setAttribute('class', 'btn btn-primary');
  editQuestionBtn.innerText = 'Submit Changes';
  editQuestionBtn.addEventListener('click',
    (e) => {
      e.preventDefault();
      changeQuestion(question);
    });

  // Adding elements to page
  questionsDiv.innerHTML = 'Question Text: <br>';
  questionsDiv.append(questionText);

  mainDiv.append(questionOptionsDiv);
  questionOptionsDiv.innerHTML = 'Options: <br>';
  questionOptionsDiv.append(questionOption1);
  questionOptionsDiv.append(questionOption2);
  questionOptionsDiv.append(questionOption3);

  mainDiv.append(answerDiv);
  answerDiv.innerHTML = 'Answer: <br>';
  answerDiv.append(answer);

  mainDiv.append(buttonDiv);
  buttonDiv.append(editQuestionBtn);

  // TODO: Edit question difficulty and review status
  // TODO: Add ability to delete question
}

function changeQuestion(question) {
  const questionText = document.getElementById('questiontext');
  const questionOption1 = document.getElementById('questionoption1');
  const questionOption2 = document.getElementById('questionoption2');
  const questionOption3 = document.getElementById('questionoption3');
  const answerText = document.getElementById('answertextarea');
  const editQ = {
    method: 'PATCH',
    headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': false,
          },
    body: JSON.stringify({
      question: question.id,
      text: questionText.value,
      option1: questionOption1.value,
      option2: questionOption2.value,
      option3: questionOption3.value,
      answer_key: answerText.value,
    }),
  };
  fetch(`http://127.0.0.1:3000/questions/${question.id}`, editQ);
  const questionsDiv = document.getElementById('questionsdiv');
  questionsDiv.innerHTML = '';
  const questionOptionsDiv = document.getElementById('questionoptionsdiv');
  questionOptionsDiv.innerHTML = '';
  const answerDiv = document.getElementById('answerdiv');
  answerDiv.innerHTML = '';
  const buttonDiv = document.getElementById('buttondiv');
  buttonDiv.innerHTML = '';
  fetchAllQuestions();
}

function el(id) {
  return document.getElementById(id);
}
