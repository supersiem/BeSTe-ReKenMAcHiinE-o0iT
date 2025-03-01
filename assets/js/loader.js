const template = document.getElementById("1");
const container = document.getElementById("constainer");
const backup = container.innerHTML;
let antwoord = document.getElementById("antwoord");
let output = "";
let nummers = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "=", "0", "DEL", "/"];
const nummbers_old = [...nummers];
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", "(", ")", ";", ":", "?", "!", ","];
let user_input = [];


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
function flip_a_coin() {
    return Math.floor(Math.random() * 2);
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
function get_random_nummer_or_operator() {
    if (flip_a_coin() == 1) {
        return letters[Math.floor(Math.random() * letters.length)];
    } else {

        return nummbers_old[Math.floor(Math.random() * nummbers_old.length)];
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
    if (flip_a_coin() == 1) {
        nummers.push(get_random_nummer_or_operator());
        if (flip_a_coin() == 1) {
            nummers.pop();
        }
    }
    if (nummers.length > 32) {
        nummers.pop();
        nummers.pop();
        nummers.pop();

    }
}
render();