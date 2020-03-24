// James
// display 5 randomly selected questions
// all from Basic difficulty level

/* DOM load */
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM is loaded")

  fetch('http://localhost:3000/questions')
    .then(res => res.json())
    .then(data => renderTestQuestions(data))
});

/* Display 5 random basic questions */
function renderTestQuestions(data) {
  console.log(`renderTestQuestions function:\n`, data);
  
  const easy = data.filter(filterEasyTests);
  const hard = data.filter(filterHardTests);
  
  // console.log(hard);

  /* create the div that will hold the ol */
  const testsDiv = document.createElement('div');
  testsDiv.setAttribute('id', 'test_questions_container');
  testsDiv.innerText = 'Test questions will list within this div';

  /* create the ol */
  /* add to testsDiv */
  const testsOl = document.createElement('ol');
  testsOl.setAttribute('id', 'test_questions_list');
  testsDiv.append(testsOl);

  /* loop through data */
  /* to add questions to list */
  hard.forEach(question => {
    const questionLi = document.createElement('li');
    questionLi.setAttribute('id', question.id);
    questionLi.setAttribute('class', 'list-group-item');
    questionLi.innerText = question.text;
    testsOl.appendChild(questionLi);
  });

  
  /* append to the content wrapper div */
  el('content-wrapper').append(testsDiv);

};

function filterEasyTests(data) {
  return data.difficulty == 'easy';
};

function filterHardTests(data) {
  return data.difficulty == 'hard';
};




function el(id) {
  return document.getElementById(id);
};
// James -end