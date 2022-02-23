buttons = 4


a = []
cur = 0
running = true


const pause = time => new Promise(resolve => setTimeout(resolve, time))


//Generating board from script, to easier change number of buttons
function generate() {
    var d = document.getElementById("board")
    for (let i = 0; i < buttons; i++) {
        var b = document.createElement("BUTTON")
        d.appendChild(b);
        b.id = String(i + 1)
        b.innerHTML = String(i + 1)

        b.classList.add("button")
        //b.onclick = check(String(i))
        b.style.backgroundColor = "lightyellow"
    }
}


async function start() {
    document.getElementById("start").style.visibility = "hidden"
    document.getElementById("result").innerHTML = ""

    a = []
    cur = 0
    await showSequence()
}






async function showSequence() {

    running = true
    //Adding a new element
    a[a.length] = 1 + Math.floor(Math.random() * buttons)

    var b = document.getElementById("1")
    let i = 0


    for (let i = 0; i < a.length; i++) {
        if (String(a[i]) != b.id) {
            b = document.getElementById(String(a[i]))
        }
        b.style.backgroundColor = "red"
        await pause(1000)
        b.style.backgroundColor = "lightyellow"
        await pause(200)
    }
    running = false
}






async function check(c) {
    running = true
    document.getElementById(String(c)).style.backgroundColor = "blue"
    await pause(300)
    document.getElementById(String(c)).style.backgroundColor = "lightyellow"
    if (String(c) != a[cur]) {
        gameOver()
        return
    }
    cur++
    if (cur == a.length) {
        cur = 0
        await pause(1000)
        await showSequence()
    }
    running = false
}


document.onkeydown = function () {
    if (running == false) {
        for (let i = 1; i < buttons + 1; i++) {
            if (window.event.keyCode == i + 48) {
                check(window.event.keyCode - 48)
            }
        }
    }
}

function gameOver() {
    document.getElementById("start").style.visibility = "visible"
    document.getElementById("result").innerHTML = "Score: " + String(a.length - 1)
    running = true
}







