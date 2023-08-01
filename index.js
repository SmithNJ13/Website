const url = "https://capitals-quiz.onrender.com/countries";
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./static/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="./static/css/navbar.css">
    <script defer src="./static/js/index.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
    <title>Guess the Capital</title>
</head>
<body>
    <nav>
        <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="./home.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./capitals.html">Capital Guesser</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Training</a>
            </li>
          </ul>
    </nav>
    <div id="score-bar">
        <h1 id="score"></h1>
    </div>
    <div id="question">
        <p id="random-country"></p>
    </div>
    <form id="country-guess">
        <input type="text" name="answer" placeholder="e.g. London" class="form-text">
        <input type="submit" value="Submit" class="submit-btn">
    </form>
</body>
</html>
`

let currentCapital;
let score = 0;
const scoreText = document.querySelector("#score");

function displayScore() {
  scoreText.textContent = `Score: ${score}`
}

function getRandomCountry(countries) {
  const max = countries.length;
  const randIdx = Math.floor(Math.random() * max);
  return countries[randIdx];
}

function fetchCountry(data) {

  const country = getRandomCountry(data);

  const textElement = document.querySelector("#question");
  textElement.textContent = country['name'];

  currentCapital = country['capital'];
  console.log(currentCapital);
}

function displayCountry() {
  fetch(url)
  .then(resp => resp.json())
  .then(fetchCountry);
}

function checkAnswer(e) {
  e.preventDefault();
  const input = e.target.answer.value;
  if (input === currentCapital) {
    score++;
    console.log(score)
    console.log("correct")
  }
  e.target.answer.value = '';
  displayScore();
  displayCountry();
}

const form = document.querySelector('#country-guess');
form.addEventListener('submit', checkAnswer);

displayScore();
displayCountry();
