const hpContentSelector = document.querySelector(".content")
const media576px = window.matchMedia("(max-width: 576px)")
const media768px = window.matchMedia("(max-width: 768px)")
const media992px = window.matchMedia("(max-width: 992px)")

console.log("RIGHT SCRIPT INSERTED");

const moveHP = () => {
    console.log("FIRST WORKING")
    if (media576px.matches) {
        hpContentSelector.setAttribute("style","top: 70%");
    } else if (media768px.matches)  {
        hpContentSelector.setAttribute("style","top: 100%");
    } else if (media992px.matches) {
        hpContentSelector.setAttribute("style","top: 120%");
    }
    document.querySelector(".navbar-toggler-icon").removeEventListener('click', moveHP);
    document.querySelector(".navbar-toggler-icon").addEventListener('click', standardHP)
}

const standardHP = () => {
    console.log("SECOND WORKING")

    if (media576px.matches) {
        hpContentSelector.setAttribute("style","top: 50%");
    } else if (media992px.matches)  {
        hpContentSelector.setAttribute("style","top: 115%");
    }
    document.querySelector(".navbar-toggler-icon").removeEventListener('click', standardHP);
    document.querySelector(".navbar-toggler-icon").addEventListener('click', moveHP);
}

document.querySelector(".navbar-toggler-icon").addEventListener('click', moveHP)

  
const imgClassSelector = document.querySelector("#hero-image")
// const bodySelector = document.querySelector("#background")


const heroPicture = () => {
    // console.log(document.location.pathname)
    if(document.location.pathname !== "/"){
    //     imgClassSelector.setAttribute("class","image")
    // } else {
        imgClassSelector.setAttribute("class","no-hero-image")
        // bodySelector.setAttribute("class","background")

        // headerSelector.setAttribute("class","nav-color")
    }
}

heroPicture();

