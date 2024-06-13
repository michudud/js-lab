let gameStarted = false
let date
let possibleToClick = false
let times = []
let missClicks = 0;


async function startGame(){
    if(!gameStarted){
        gameStarted = true;
        times = []
        missClicks = 0
        document.getElementById("best").value = ""
        document.getElementById("worst").value = ""
        document.getElementById("average").value = ""
        document.getElementById("misses").value = ""
        let noOfPlays = document.getElementById("Number").value
        for(let i = 0; i <noOfPlays ; i++){
            if(gameStarted){
                let randomTime = Math.round(Math.random() * (5000 - 1000) + 1000)
                await delay(randomTime)
                if(gameStarted){
                    changeBgColor()
                    date = new Date()
                    await waitForUser()
                }               
            }else{
                break
            }
            
        }
        stopGame()
    }
}

async function stopGame(){
    if(gameStarted){
        gameStarted = false;
        document.getElementById("gameArea").style.backgroundColor = "black"
        possibleToClick = false       
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForUser() {
    const poll = resolve => {
        if(!possibleToClick) resolve();
        else setTimeout(_ => poll(resolve), 100);
      }
    
      return new Promise(poll);
}

function changeBgColor(){
    document.getElementById("gameArea").style.backgroundColor = getRandomColor()
    possibleToClick = true
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function gameAreaClick(){
    if(gameStarted){
    if(possibleToClick){
        possibleToClick = false
        let clickTime = new Date().getTime() - date.getTime()
        times.push(clickTime)
        times.sort(function(a,b){
            return a-b;
        })
        document.getElementById("best").value = times[0]
        document.getElementById("worst").value = times[times.length -1]
        const average = array => array.reduce((a, b) => a + b) / array.length;
        document.getElementById("average").value = Math.round(average(times))
        let record = document.getElementById("record").value
        if(record){
            if(clickTime<record){
                document.getElementById("record").value = clickTime
            }
        }else{
            document.getElementById("record").value = clickTime
        }
    }else{
        missClicks++
        document.getElementById("misses").value = missClicks
    }
}
  }
