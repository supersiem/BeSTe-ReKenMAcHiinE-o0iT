const template = document.getElementById("1");
const container = document.getElementById("constainer");
const backup = container.innerHTML;
let antwoord = document.getElementById("antwoord");
let output = "";
let nummers = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "=", "0", "DEL", "/"];
const nummbers_old = [...nummers];
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", "(", ")", ";", ":", "?", "!", ",", "24", "24", "24", "24"];
const knoppen = ["button-85"];
let user_input = [];
let body = document.body;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
function flip_a_coin() {
    return Math.floor(Math.random() * 2);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function render() {
    nummers.forEach(nummer => {
        let new_node = template.cloneNode(true);
        new_node.style.display = "inline-block";
        new_node.querySelector("button").innerHTML = nummer;
        new_node.addEventListener("click", () => {
            reken(nummer);
        });
        container.appendChild(new_node);
    });
}
function random_number(a = 0, b = 100) { return Math.floor(Math.random() * (b + 1)); }
function get_random_nummer_or_operator() {
    if (flip_a_coin() == 1) {
        return letters[Math.floor(Math.random() * letters.length)];
    } else {

        return random_number(0, 500);
    }
}
function reken(nummer) {
    if (nummer == "=") {
        let string = user_input.join("");
        antwoord.innerHTML = eval(string);
        user_input = [antwoord.innerHTML];
    }
    else if (nummer == "DEL") {
        user_input.pop();
    } else {
        user_input.push(nummer);
    }
    antwoord.innerHTML = user_input.join("");
    leuk();
}
function leuk() {
    container.innerHTML = backup;

    shuffle(nummers);
    render();
    moveToRandomPosition();
    nummers.push(get_random_nummer_or_operator());
    nummers.push(get_random_nummer_or_operator());

    if (flip_a_coin() == 1) {
        grappig();
        nummers.pop();
    }

    if (nummers.length > 32) {
        nummers.pop();
    }
    body.style.background = "linear-gradient(90deg, " + getRandomColor() + " 0%, " + getRandomColor() + " 35%, " + getRandomColor() + " 100%)";

}
function getRandomColor() {
    color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
}

async function grappig() {
    let div = document.getElementById('ding'),
        deg = 1;


    for (let i = 0; i < 360; i++) {
        div.style.transform = 'rotate(' + deg + 'deg)';
        deg += 1;
        await sleep(0.1);

    }
}
function moveToRandomPosition() {
    let div = document.getElementById('ding');
    // Get viewport dimensions
    const viewportWidth = window.innerWidth - div.offsetWidth;
    const viewportHeight = window.innerHeight - div.offsetHeight;

    // Generate random positions
    const randomX = Math.floor(Math.random() * viewportWidth);
    const randomY = Math.floor(Math.random() * viewportHeight);

    // Apply new positions
    div.style.marginLeft = `${randomX}px`;
    div.style.marginTop = `${randomY}px`;
}

render();
