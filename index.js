/* JS document */

const bossInformation = document.getElementsByClassName("boss-lore");
const cubeBossOne = document.getElementsByClassName("face");
const bossIcons = document.getElementsByClassName("boss-icon");
const bossFightVideo = document.getElementById("embed-video");
const gameChanger = document.getElementById("change-game");
const cube3D = document.getElementById("cube");
var currentGame = "dark-souls-1"; // Default (it can change to "dark-souls-2")
var currentBoss = "one"; // Default: Nito


const setUp = () => {
    /* Prepares the addEventListener after the DOM loads */
    let bosses = ["one", "two", "three", "four"];
    for (index=0; index < 4; index++) {bossIconsListener(index, bosses[index])}
    gameChanger.addEventListener("click", switchGame, false);
}

const bossIconsListener = (index, boss) => {
    bossIcons[index].addEventListener(
        "click", () => {changeBoss(boss), currentBoss = boss}, false);
}

const switchGame = () => {
    if (currentGame === "dark-souls-1") {currentGame = "dark-souls-2"}
    else if (currentGame === "dark-souls-2") {currentGame = "dark-souls-1"}

    gameChanger.src = `src/${currentGame}.png`;
    changeBoss(currentBoss);
}

const getBossData = async () => {
    /* Is a request-function to get the data from the JSON files */
    let request = `json/dark-souls.json`;
    let response = await fetch(request);
    let json = await response.json();
    return json
}

const changeBoss = async (boss) => {
    let data = await getBossData();
    data = data[currentGame];

    cubeAnimation(data[boss].degrees); // 3D cube animations
    bossDescription(data[boss]); // Text changer and animations
    bossGrayScale(data[boss].iconId); // Boss-icons gray scale animation
    bossFightVideo.src = data[boss].video; // Youtube video changer
}

const cubeAnimation = (degrees) => {
    cube3D.style.transition = "ease-in-out 2.5s";
    cube3D.style.transform = `rotateY(${degrees})`;
    setTimeout(() => cube3D.style.transition = "all 0s", 100);
}

const bossGrayScale = (iconId) => {
    for (tag of bossIcons) {
        tag.style.transition = "ease-out 0.5s";
        tag.style.filter = "grayscale(80%)";

        if (tag.id === iconId) {tag.style.filter = "grayscale(0%)"}
        setTimeout(() => {tag.style.transition = "all 0s"}, 100);
    }
}

const bossDescription = (description) => {
    for (tag of bossInformation) {
        tag.style.transition = "ease-in-out 0.75s";
        tag.style.opacity = 0;
    }

    setTimeout(() => {
        bossInformation[0].innerHTML = description.name;
        bossInformation[1].innerHTML = description.nick;
        bossInformation[2].innerHTML = description.lore;

        for (tag of bossInformation) {tag.style.opacity = 1}
    }, 750)

    setTimeout(() => {
        for (tag of bossInformation) {tag.style.transition = "all 0s"}
    }, 1000)
}

// Wait for the DOM to start the script
window.addEventListener('load', setUp, false);
