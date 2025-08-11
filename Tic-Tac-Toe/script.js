let boxes= document.querySelectorAll(".box");
let rstBtn=document.querySelector("#reset");
let newGamebtn= document.querySelector("#new-game");
let msgContainer=document.querySelector(".msg-container"); 
let msg=document.querySelector("#msg");

let turnO=true;
const winPatterns=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () =>{
    turnO=true;
    enableboxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",() =>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const disableboxes=() =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableboxes=() =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner= (winner) =>{
    msg.innerText=`Congratulations, The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
}

const checkWinner=() => {
    for(let pattern of winPatterns){
        let pos1val= boxes[pattern[0]].innerText;
        let pos2val= boxes[pattern[1]].innerText;
        let pos3val= boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("Winner", pos1val);
                showWinner(pos1val);
            }
        }
    }
};
 
newGamebtn.addEventListener("click",resetGame);
rstBtn.addEventListener("click",resetGame);