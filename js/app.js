let buttonTop = null;

document.addEventListener("DOMContentLoaded", (e) => {
    loadScript("js/burgermenu.js").catch(console.log);
    loadScript("js/youtube.js").catch(console.log);

    buttonTop = document.body.querySelector(".startPage");
    buttonTop.onclick = moveTopStart;
    checkScroll();
});

document.addEventListener("scroll", checkScroll);

function checkScroll(){
    let windowHeight = window.innerHeight;

    if(pageYOffset + 200 > windowHeight){
        buttonTop.classList.add("show-arrow");
    } else {
        buttonTop.classList.remove("show-arrow");
    }
}

function moveTopStart(){
    let smoothScroll;
    let fromTop = pageYOffset;
    const speed = 10;
    const STEP = fromTop * (speed / 1000);

    smoothScroll = setInterval(() => {
        if(fromTop <= 0){
            clearInterval(smoothScroll);
        } else {
            fromTop -= STEP;
            document.documentElement.scrollTop = fromTop;
        }
    }, 0);
}



function loadScript(src){
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(script);
            console.log(`Script ${src} loaded.`);
        }
        script.onerror = () => reject(`Something happened, script ${src} not loaded`);

        document.head.append(script);
    });
}
