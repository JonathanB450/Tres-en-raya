let board = [
    ['','',''],
    ['','',''],
    ['','','']
]
let players = ['O', 'X']
let currentPlayer
let available = []
let end = false
let resultP = document.getElementById('paragraph');

function setup() {
    createCanvas(400, 400);
    background(0);
    frameRate(3)
    currentPlayer = floor(random(players.length))
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            available.push([i, j])
        }
    }
} 

function clearBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            board[i][j] = ''
            available.length = 0
            available.push([i, j])
        }
    }
    resultP.innerHTML = ''
    end = false
    currentPlayer = undefined
    clear()
    setup()
    draw()
}

function consecutives(a,b,c){
    return (a==b & a==c && b==c && a != '') 
}

function checkWinner(){
    let winner = null

    //Vertical
    for (let i = 0; i < 3; i++) {
        if (consecutives(board[i][0],board[i][1], board[i][2])) {
            next = false
            winner = board[i][0]
            end = true
            switch (i) {
                case 0:
                    line(width/6, 0, width/6, height)                    
                    break;
                case 1:
                    line((width/6)*3, 0, (width/6)*3, height)
                    break;
                case 2:
                    line((width/6)*5, 0, (width/6)*5, height)
                    break;
                default:
                    break;
            }
            fill(0,255,0,127);
            rect(0,0,400,400)
        }
         
    }

    //horizontal
    for (let i = 0; i < 3; i++) {
        if (consecutives(board[0][i],board[1][i], board[2][i])) {
            next = false
            winner = board[0][i]
            end = true
            switch (i) {
                case 0:
                    line(0, height/6, width, height/6)
                    break;
                case 1:
                    line(0, (height/6)*3, width, (height/6)*3)                   
                    break;
                case 2:
                    line(0, (height/6)*5, width, (height/6)*5)                   
                    break;
                default:
                    break;
            }
            fill(0,255,0,127);
            rect(0,0,400,400)
        }
        
    }

    //Diagonal
    for (let i = 0; i < 3; i++) {
        if (consecutives(board[0][0],board[1][1], board[2][2])) {
            next = false
            winner = board[0][0]
            end = true
            line(0,0,400,400)
            fill(50,255,0,60);
            rect(0,0,400,400)
        }
        
        if (consecutives(board[2][0],board[1][1], board[0][2])) {
            next = false
            winner = board[2][0]
            end = true
            line(width, 0, 0,height)
            fill(50,255,0,60);
            rect(0,0,400,400)
        }
        
    }

    //Tie
    if (winner == null && available.length == 0) {
        fill(255,0,0,127)
        rect(0,0,400,400)
        end = true
        return 'tie'
       
    }else{
        return winner
    }
    
}   

function nextTurn() {
    let index = floor(random(available.length))
    let spot = available.splice(index, 1)[0];
    let i = spot[0]
    let j = spot[1]
    currentPlayer = (currentPlayer + 1)%players.length
    board[i][j] = players[currentPlayer]   
}

function draw(){
    background(255)
    let w = width /3
    let h = height /3
    line(0, 0, 0, height)
    line(width, 0, width, height)
    line(width, height, 0, height)
    line(0, 0, width, 0)


    line(w, 0, w, height)
    line(w*2, 0, w*2, height)
    line(0, h, width, h)
    line(0, h*2, width, h*2)

    start()
}

function start() {
    
    let w = width /3
    let h = height /3

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w*i+w/2
            let y = h*j+h/2
            let spot = board[i][j]
            textSize(32)
            strokeWeight(4)
            if (spot === players[0]) {
                noFill()
                ellipse(x,y,w/2)
            }else if(spot === players[1]){
                let xr = w/4
                line(x-xr, y-xr, x+xr, y+xr)
                line(x+xr, y-xr, x-xr, y+xr)

            }
            
        }  
    }

    let result = checkWinner();
    if (result != null) {
        noLoop();
        text = document.getElementById('text')
        if (result == 'tie') {
            resultP.innerHTML = "Tie!"
            setTimeout('clearBoard()', 1000)
        } 
        else {
            resultP.innerHTML = `${result} wins!`;
            setTimeout('clearBoard()', 1000)
        }
    } 
    else {
        nextTurn();    
    }
    
}