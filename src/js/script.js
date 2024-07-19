const boxs = document.querySelectorAll('[data-index]');
const textendgame = document.querySelector('.textendgame')
const data_mensage = document.querySelector('[data-mensage]')
const btn = document.getElementById('restart')
let playerturn;
let moveCount = 0;

const win =[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

btn.addEventListener('click', restart)

function restart(e){
    playerturn = false;
    moveCount = 0;

    for(box of boxs){
        box.classList.remove('x');
        box.classList.remove('circle');
        box.removeEventListener('click', click);
        box.addEventListener('click', click, { once: true});
    }

    data_mensage.classList.add('lone');
}

const checkforwin = (playerClass) =>{
    return win.some(trajectory =>{
        return trajectory.every(index =>{
            return boxs[index].classList.contains(playerClass);
        });
    });
};


const endgame = (isDraw) => {
    if(isDraw){
        textendgame.innerText = `Empate`
    }else{
        textendgame.innerText = playerturn ? 'O círculo venceu' : 'O X venceu'
    }

    data_mensage.classList.remove('lone')
}


function turn(){
    playerturn = !playerturn
}

function click(e){
    const box = e.target;
    const classadd = playerturn ? 'circle' : 'x';

    box.classList.add(classadd);
    moveCount++;


    const iswin = checkforwin(classadd);
    if(iswin){
        endgame(false);
    }else if(moveCount === boxs.length){
        endgame(true);
    }else{
        turn();
    }
};

for(const box of boxs){
    box.addEventListener('click', click, { once: true});
};

