let gameStarted = false
let date
let possibleToClick = false
let times = []
let missClicks = 0;


async function startGame(){
    if(!gameStarted){
        for(let i = 0; i <5 ; i++){
            let randomTime = Math.round(Math.random() * (5000 - 1000) + 1000)
            await delay(randomTime)
            changeBgColor()
            date = new Date()
            await waitForUser()
            console.log(times)
        }
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
    if(possibleToClick){
        possibleToClick = false
        let clickTime = new Date().getTime() - date.getTime()
        times.push(clickTime)
        times.sort()
        document.getElementById("best").value = times[0]
        document.getElementById("worst").value = times[times.length -1]
        const average = array => array.reduce((a, b) => a + b) / array.length;
        document.getElementById("average").value = Math.round(average(times))
    }else{
        missClicks++
        document.getElementById("misses").value = missClicks
    }
  }
