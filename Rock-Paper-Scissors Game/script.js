let user_score = 0;
let computer_score = 0;

const options = document.querySelectorAll(".option");

const user_points = document.querySelector("#user-point");
const comp_points = document.querySelector("#comp-point");

const message = document.querySelector(".msg_para");


const getComp_move = () => {
    const comp_choice = ["Rock", "Paper", "Scissors"];
    const choiceIdx = Math.floor(Math.random() * 3);
    return comp_choice[choiceIdx];
}

options.forEach((option) => {
    option.addEventListener("click", () => {
        const user_move = option.getAttribute("id");
        gameplay(user_move);
    })
})


const gamedraw = () => {
    message.innerText = "It's a draw!";
    message.classList.add("msg_para");
    message.classList.remove("userMsg", "compMsg");

}

const gameplay = (user_move) => {
    const comp_move = getComp_move();

    if (user_move === comp_move) {
        gamedraw();
    }
    else {
        let user_win = true;

        if (user_move === "Rock") {
            user_win = comp_move === "Paper" ? false : true;
        }
        else if (user_move === "Paper") {
            user_win = comp_move === "Scissors" ? false : true;
        }
        else {
            user_win = comp_move === "Rock" ? false : true;
        }
        showWinner(user_win, user_move, comp_move);
    }

}

const showWinner = (user_win, user_move, comp_move) => {
    if (user_win) {
        user_score++;
        user_points.innerText = user_score;
        message.innerText = `You are Winner! your ${user_move} beats ${comp_move}`;
        message.classList.add("userMsg")
        message.classList.remove("compMsg", "msg_para");

    }
    else {
        computer_score++;
        comp_points.innerText = computer_score;
        message.innerText = `You lost the game! ${comp_move} beats your ${user_move}`;
        message.classList.add("compMsg");
        message.classList.remove("userMsg", "msg_para");

    }
}


