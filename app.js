/* 
  Todo: 
   2) disable button after it's been clicked
*/


function createBoard(row, col){
    a = []
    for(var i=0; i < row; i++){
        a[i] = []
        for(var j=0; j < col; j++){
            a[i][j] = null
        }
    } return a
}
var gameBoard = createBoard(10, 10);
var greenDisk = 'g';
var blueDisk = 'b';

function helper(disk, row, col, x, y){
    var pieces = 1,
        theRow = row + x,
        theCol = col + y;
    while(theRow >= 0 && theRow < 10 && theCol >= 0 &&
          theCol < 10 && gameBoard[theRow][theCol] == disk){
            pieces++;
            theRow+=x;
            theCol+=y; 
        }
        theRow = row - x;
        theCol = col - y;
         while(theRow >= 0 && theRow < 10 && theCol >= 0 &&
              theCol < 10 && gameBoard[theRow][theCol] == disk){
                pieces++;
                theRow-=x;
                theCol-=y; 
        }
        return pieces;
}

function isWinningMove(row, col){
        
    if(helper(gameBoard[row][col], row, col, 1, 0) >= 5){
        return true;
    }
    if(helper(gameBoard[row][col], row, col, 0, 1) >= 5){
        return true;
    }
    if(helper(gameBoard[row][col], row, col, 1, -1) >= 5){
      return true;
    }
    if(helper(gameBoard[row][col], row, col, 1, 1) >= 5){
        return true;
    }
      return false;      
}


new Vue({
	el: '#app',
  data: {
  	board: gameBoard,
    turn: false,
    title: 'Gomoku',
    winner:'',
  },
  methods:{
    handleClick: function(index, parent){
      this.turn = !this.turn;

      this.turn ? this.board[parent][index] = greenDisk 
      : this.board[parent][index]= blueDisk;

      if(this.turn && isWinningMove(parent, index)===true){
          this.winner = "Green is the winner";
      } else if(!this.turn && isWinningMove(parent, index)===true){
          this.winner = "Blue is the winner";
      }

    },
    isGreen: function(index,parent){
      return (this.board[parent][index] == greenDisk);
    },
    isBlue: function(index,parent){
      return !(this.turn == null) && (this.board[parent][index] == blueDisk);
    }    
  }
});