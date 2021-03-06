let buttons = [];
let highscoreButtons = [];
let font;
let state = "home";
let scores;
let title, options, play, shipColor, highscores, upgrades, optionsBack, highscoreBack, xhr;

function preload() {
  font = loadFont("space-obsessed.ttf")
  scores = loadJSON("scores.json")
}

function get_scores(callback) {
  // High Score Data
  let file = "scores.json";

  // Fetch High Score Data
  fetch(file, {cache: 'no-cache'})
    .then(function(response) {
        //  If the response isn't OK
      if (response.status !== 200) {
        console.log(response.status)
      }
      // If the response is OK
      response.json().then(function(data) {
        let scores = JSON.stringify(data);
        console.log(scores);
        callback(scores);
      });
    })
    // If there is an error
    .catch(function(err) {
      console.log(err)
    });
}

function submitHighscore(name, score) {
  myform = document.getElementById("my-form")
  myname = document.getElementsByName("player_name")[0]
  myscore = document.getElementsByName("player_score")[0]
  myname.value = name
  myscore.value = score
    
  formData = new FormData(myform)
  fetch ("asteroids.php", {
    method: "post",
    body: formData
  })
  .then (function (response){
    return response.text();
  })
  .then(function(text) {
    console.log(text);
  })
  .catch(function (err) {
    console.log(err)
  })
}

function setup() {
  createCanvas(0, 0)
    
  submitHighscore("Misha Harleman", 3)
    
  title = new Button("Asteroids", 0, 0, 0, false)

  options = new Button("Options", 0, 0, 0, false)
  options.onclick(showOptions)

  play = new Button("Play Game", 0, 0, 0, false)
  play.onclick(playGame)

  shipColor = new Button("Change Color", 0, 0, 0, false)
  shipColor.hide()
  shipColor.onclick()

  highscores = new Button("Highscores", 0, 0, 0, false)
  highscores.hide()
  highscores.onclick(showHighscores)

  upgrades = new Button("Upgrades", 0, 0, 0, false)
  upgrades.hide()
  upgrades.onclick()

  optionsBack = new Button("Back", 0, 0, 0, false, false, false)
  optionsBack.hide()
  optionsBack.onclick(homeScreen)

  highscoreBack = new Button("Back", 0, 0, 0, false, false, false)
  highscoreBack.hide()
  highscoreBack.onclick(showOptions)

  for (var i = 0; i < Object.keys(scores).length; i++) {
    button = new Button(scores[i].name + ": " + scores[i].score, 0, 0, 0, false)
    button.hide()
    highscoreButtons.push(button)
  }

  resize()
}

function playGame() {
  title.hide()
  play.hide()
  options.hide()
  state = "game"
}

function showOptions() {
  title.hide()
  play.hide()
  options.hide()
  for (var button of highscoreButtons) {
    button.hide()
  }
  highscoreBack.hide()
  state = "options"
  shipColor.show()
  highscores.show()
  upgrades.show()
  optionsBack.show()
}

function homeScreen() {
  shipColor.hide()
  highscores.hide()
  upgrades.hide()
  optionsBack.hide()
  state = "home"
  title.show()
  play.show()
  options.show()
}

function showHighscores() {
  shipColor.hide()
  highscores.hide()
  upgrades.hide()
  optionsBack.hide()
  state = "highscores"
  for (var button of highscoreButtons) {
    button.show()
  }
  highscoreBack.show()
}

function resize() {
  resizeCanvas(windowWidth, windowHeight)
  title.change(width/2, height/4, width/5)
  options.change(width/4, 3*height/4, width/15)
  play.change(3*width/4, 3*height/4, width/15)
  shipColor.change(width/4, height/4, width/15)
  highscores.change(3*width/4, height/4, width/15)
  upgrades.change(width/2, 2*height/3, width/10)
  optionsBack.change(25, height-10-width/20, width/20)
  highscoreBack.change(18*width/20-25, height-10-width/20, width/20)
  for (var i = 0; i < highscoreButtons.length; i++) {
    highscoreButtons[i].change(width/2, map(i, 0, highscoreButtons.length, 50, height), width/30)
  }
}

function windowResized() {
  resize()
}

function draw() {
  background(0)
  for (var button of buttons) {
    button.update()
    button.draw()
  }
  if (state == "highscores" && frameCount % 60 == 0) {
    get_scores(function(scores) {
      let object = JSON.parse(scores);
      for (var i = 0; i < highscoreButtons.length; i++) {
        highscoreButtons[i].string = object[i].name + ": " + str(object[i].score)
      }
    })
  }
}
