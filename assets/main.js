/*
var fileList;
const fileSelector = document.getElementById("file-selector");

fileSelector.addEventListener("change", (event) =>{
    fileList = event.target.files;
    cypher(fileList);
});
*/

class Secure{

    password;

    // Número de caracteres en la codificación UTF-8
    maxCodificationNumber;

    constructor(password, maxCodificationNumber){
        this.password = password;
        this.maxCodificationNumber = maxCodificationNumber;
    }

    static newSecureUTF8(password){
        return new Secure(password, 1920);
    }

    static newSecureASCII(password){
        return new Secure(password, 128);
    }

    static newSecureISO8859_1(password){
        return new Secure(password, 256);
    }

    slideChar(charToSlide, numberOfSlides){
        return String.fromCharCode((charToSlide.charCodeAt(0) + (numberOfSlides.charCodeAt(0) ** 2)) % this.maxCodificationNumber);
    }

    slideCharReverse(charToUnslide, numberOfSlides) {
        return String.fromCharCode((((charToUnslide.charCodeAt(0) - (numberOfSlides.charCodeAt(0) ** 2)) % this.maxCodificationNumber) + this.maxCodificationNumber) % this.maxCodificationNumber);
    }

    cypherString(stringToCyper, passwordPosition){
        if(typeof passwordPosition === 'undefined') passwordPosition = 0;
        console.log(passwordPosition);
        var cyphered = '';
        stringToCyper.split('').forEach( character => {
            cyphered += this.slideChar(character, this.password[passwordPosition++ % this.password.length]);
        });
        return cyphered;
    }

    decypherString(stringToCyper, passwordPosition){
        if(typeof passwordPosition === 'undefined') passwordPosition = 0;
        var cyphered = '';
        stringToCyper.split('').forEach( character => {
            cyphered +=  this.slideCharReverse(character, this.password[passwordPosition++ % this.password.length]);
        });
        return cyphered;
    }

}

const password = document.getElementById("password");
const toCypher = document.getElementById("text");
const seed = document.getElementById("seed");
const cyphered = document.getElementById("cyphered");
const output = document.getElementById("output");
var secure;

function checkData(){
    ready = true;
    if(password.value == ""){
        password.classList.add("redBorder");
        ready = false;
    }
    if(toCypher.value == ""){
        toCypher.classList.add("redBorder");
        ready = false;
    }
    return ready;
}

function checkSeed(){
    if(seed.value == ""){
        seed.classList.add("orangeBorder");
        alert("No has introducido semilla, se establece la semilla por defecto a 0, es menos seguro.");
        seed.value = 0;
        return 0;
    }
    if(seed.value == "0"){
        seed.classList.add("orangeBorder");
        alert("No has introducido semilla, se establece la semilla por defecto a 0, es menos seguro.");
        return 0;
    }
    const regex = /^\d+$/;
    if (regex.test(seed.value)) {
        return parseInt(seed.value);
    }
    seed.classList.add("redBorder");
    alert("La semilla ha de ser un número entero positivo.");
    return -1;
}

function reset(){
    password.classList.remove("redBorder");
    toCypher.classList.remove("redBorder");
    seed.classList.remove("orangeBorder");
    seed.classList.remove("redBorder");
    cyphered.innerHTML = "";
    output.innerHTML = "";
    secure = Secure.newSecureUTF8(password.value);
}

function cypher() {
    reset();
    if(checkData()){
        var seedValue = checkSeed();
        if(seedValue < 0);
        else if (seedValue == 0){
            cyphered.innerHTML = secure.cypherString(document.getElementById("text").value);
        } else {
            cyphered.innerHTML = secure.cypherString(document.getElementById("text").value, seedValue);
        }
    }
}

function decypher() {
    reset();
    var seedValue = checkSeed();
    if(seedValue < 0);
    else if (seedValue == 0){
        cyphered.innerHTML = secure.decypherString(document.getElementById("text").value);
    } else {
        cyphered.innerHTML = secure.decypherString(document.getElementById("text").value, seedValue);
    }
    
}

function copy(element) {
    var content = element.innerText;
    if(content != ""){
        var temp = document.createElement("textarea");
        temp.value = content;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        output.innerHTML = "- [ Texto copiado al portapapeles ] ";
        document.body.removeChild(temp);
    }
    
}