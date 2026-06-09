let boxes = document.querySelectorAll(".btn");
let reset_button = document.querySelector(".btn_reset");
let newgame_btn = document.querySelector(".newgame_btn");
let msg_container = document.querySelector(".container-msg");
let win_msg = document.querySelector("#win_msg");
let draw_msg = document.querySelector("#draw_msg");


let playerFirst = true;
let click_count = 0;

const winning_pattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]

];



const btn_disabled = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const btn_enabled = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerFirst === true) {
      box.innerText = "O";
      box.classList.add("first_color");
      box.classList.remove("second_color");
      playerFirst = false;
    }
    else {
      box.innerText = "X";
      box.classList.add("second_color");
      box.classList.remove("first_color");
      playerFirst = true;
    };

    box.disabled = true;
    click_count++;

    let winner_player = check_winner();

    if (click_count === 9 && !winner_player) {
      game_draw();
    }

  });
});


let game_draw = () => {
  draw_msg.innerText = "It's Draw! Play Again.";
  msg_container.classList.remove("hide");
  btn_disabled();
  reset_button.classList.add("hide");
  draw_msg.classList.remove("hide");
  win_msg.classList.add("hide");
  newgame_btn.classList.remove("hide");

}


const check_winner = () => {
  for (let pattern of winning_pattern) {
    let first_value = boxes[pattern[0]].innerText;
    let second_value = boxes[pattern[1]].innerText;
    let third_value = boxes[pattern[2]].innerText;

    if (first_value != "" && second_value != "" && third_value != "") {
      if (first_value === second_value && second_value === third_value) {
        showwinner(first_value);
        return true;
      }
    }

  }
  return false;
}

const showwinner = (winner) => {
  win_msg.innerText = `Congratulations🎉 The Winner Is '${winner}'`;
  msg_container.classList.remove("hide");
  win_msg.classList.remove("hide");
  btn_disabled();

  reset_button.classList.add("hide");
  newgame_btn.classList.remove("hide");
  draw_msg.classList.add("hide");

}

const reset_game = () => {
  playerFirst = true;
  btn_enabled();
  msg_container.classList.add("hide");
  draw_msg.classList.add("hide");
  win_msg.classList.add("hide");
  click_count = 0;
}

const new_game = () => {
  playerFirst = true;
  click_count = 0;
  btn_enabled();
  msg_container.classList.add("hide");
  draw_msg.classList.add("hide");
  win_msg.classList.add("hide");
  newgame_btn.classList.add("hide");
  
  reset_button.classList.remove("hide");

}

newgame_btn.addEventListener("click", new_game);
reset_button.addEventListener("click", reset_game);