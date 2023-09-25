
//mousetable utside the game function to avid problems or name conflict futher down

// const  mousetable = document.querySelectorAll('.box');
   const mousetable = Array.from(document.getElementsByClassName('box'));
         //   MouseOver & mouseOut for all spot's
   mousetable.forEach(box => {box.addEventListener('mouseover',myfunction1)});
   function myfunction1 () {
     
   this.classList.add('boxHuman')
  // console.log('mouseover')//ok
}
 
   mousetable.forEach(box => {box.addEventListener('mouseout',myfunction2)});
   function myfunction2 () {
  
   this.classList.remove('boxHuman')
    console.log('mouseout','mouseinn')
}



const table = Array.from(document.querySelectorAll('.box'));
table.forEach(box => {box.addEventListener('click',myfunction,{once:true})});
//Text info for Human player.Human start.
let infoTxt = document.querySelector('h1')
let currenP = 'o';
let played=[];

const freeBox = [0,1,2,3,4,5,6,7,8]
//A 2'nd table too store the moves in so the moves later can bee for winn or draw.
const table2 = new Array(9).fill(null);


//Speak for it self
   const winnOptions =
     [
     [1,4,7],
     [2,5,8],
     [0,1,2],
     [2,4,6],
     [0,4,8],
     [3,4,5],
     [6,7,8],
     [0,3,6]
 ];
   //  GAME START
function   myfunction(e) { 
infoTxt.innerText = 'Game is active'; 

//Need index of clicked box
const boxArr = Array.from(document.getElementsByClassName('box'));
//table2 and played to keep track on game.
const index = boxArr.indexOf(e.target);
table2[index] = currenP;
e.target.classList.add('boxHuman')
played.push(1);


const spliceMove = freeBox.indexOf(index)
      freeBox.splice(spliceMove, 1)
       currenP = "x"

 console.log('clickindex =_ ' + index + '_table2=_' + table2 + 'freeBox=_' + freeBox) 

// Sort out the free spots, and pcMove takes a turn.
const free = boxArr.filter(box => box.innerHTML === "");
if (free.length === 0) return; // No free spots, return early.

const pcMove = free[Math.floor(Math.random() * free.length)];
const pcMoveIndex = boxArr.indexOf(pcMove);

pcMove.classList.add('boxComputer');
table2[pcMoveIndex] = currenP;

const pcSpliceMove = freeBox.indexOf(pcMoveIndex);
freeBox.splice(pcSpliceMove, 1);
played.push(1);

console.log('_PCmoveindex =_ ' + pcMoveIndex + '_table2=_  ' + table2 + '_freeBox= ' + freeBox + '_played-' + played.length);

//currenP = currenP == 'o' ? 'x' : 'o';

//Check if boxComputer
if (winner()) {
  alert(currenP + ' won. Restart ?')
  restart()
  return
}

//if(freeBox.some((e) => e === null)) { alert('draw Restart ?') ,restart() }
if(played.length >= 9 + 1) { alert('draw Restart ? '); restart(); 
}
}
//winn check.If some row (1,2,3) in winnerOptiens.length is true return ===  true.
const winner = () => {
 return winnOptions.some((combination) => {
   if(
currenP == table2[combination[0]]  &&
   table2[combination[0]] == table2[combination[1]] &&
   table2[combination[0]] == table2[combination[2]]
)
return true;

return false;
});
}
function restart() {
  table.forEach(box => box.classList.remove('boxComputer', 'boxHuman'));
  infoTxt.innerText = 'NEW GAME';
  infoTxt.style.color = 'green';
  currenP = 'o';
  played= [];
  table2.fill(null);

  // Reset freeBox
  freeBox.length = 0;
  for (let i = 0; i < 9; i++) {
    freeBox.push(i);
  }
}

