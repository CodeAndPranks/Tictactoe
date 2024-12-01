
   // Get a table to play on[array]
    const table = Array.from(document.querySelectorAll('.box'));

    // Text info for Player
    let infoTxt = document.querySelector('h1');
    let currenP = 'o';
    let movesPlayed = [];

    // Winning combinations
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Add Eventlistener to each box
    table.forEach(box => {
        box.addEventListener('click', myfunction, { once: true });
    });

    // GAME START
    function myfunction(e) {
        // Need index of clicked box
        const boxArr = Array.from(document.getElementsByClassName('box'));
        const index = boxArr.indexOf(e.target);

        // click add 'o';
        if (currenP === 'o') {   
            table[index].classList.add('boxHuman');
            movesPlayed.push(index);
            
        } else {
            table[index].classList.add('boxComputer');
            movesPlayed.push(index);
            console.log(index , "table= " +table.length )
        }
        
        if (checkWinner()) {
            setTimeout(() => {
                alert(currenP + "_Player wins! Restart?");
                restart();
            },100);
            return;
        }

        currenP = currenP == 'o' ? 'x' : 'o';

        if (movesPlayed.length === 9) {
            setTimeout(() => {
                alert('Draw! Restart?');
                restart();
            }, 100); // Using setTimeout so 'boxComputer' got time to add  to table.Otherwise alert shows before 'boxComputer' got added to the table.
            return;
        }
    }
function checkWinner() {
    for (let combo of winCombos) {
        const boxes = combo.map(index => table[index]);
        const classes = boxes.map(box => box.classList.value);
        if (classes.every(cls => cls === 'box boxHuman') || classes.every(cls => cls === 'box boxComputer')) {
            return true;
        }
    }
    return false;
}
    function restart() {
       window.location.reload()
    }
