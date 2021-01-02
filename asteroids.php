<?php
  $player_name = filter_var($_POST["player_name"], FILTER_SANITIZE_STRING);
  $player_score = (int)$_POST["player_score"];
  $player_array = array("name" => $player_name, "score" => $player_score);

  $highscoreJson = file_get_contents("scores.json");
  $highscores = json_decode($highscoreJson, true);

  for ($i = 0; $i < count($highscores) - 1; $i++) {
    if ($player_score > $highscores[$i]["score"]) {
      $highscores[$i] = $player_array;
      break;
    }
  }

  $jsonscores = json_encode($highscores);
  file_put_contents('scores.json', $jsonscores);
?>
