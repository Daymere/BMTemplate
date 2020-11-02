'use strict';

const watchVideo = document.body.querySelector(".header-intro__video"),
      video = document.body.querySelector(".video"),
      videoClose = document.body.querySelector(".youtube__exit");

watchVideo.onclick = (e) => {
    video.classList.toggle(active);
    document.body.classList.toggle("modalActive");
}
videoClose.onclick = (e) => {
    video.classList.remove(active);
    document.body.classList.remove("modalActive");

    let iframe = document.getElementById("ytPlayer").contentWindow;
    iframe.postMessage('{"event":"command","func":"' + "pauseVideo" + '","args":""}', '*');
}

YTVideos();

function YTVideos(){

    let videos = document.getElementsByClassName("youtube");

    if (!videos) {
        let getElementsByClassName = function(node, classname) {
            let elements = [];
            let regexp = new RegExp('(^| )'+classname+'( |$)');
            let els = node.getElementsByTagName("*");

            for(let i = 0, j = els.length; i < j; i++){
                if(regexp.test(els[i].className)){
                    elements.push(els[i]);
                }
            }

            return elements;
        }

        videos = getElementsByClassName(document.body, "youtube");
    } 

    let nb_videos = videos.length;

    for (let i = 0; i < nb_videos; i++) {

        videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';
        videos[i].style.backgroundSize = "cover";

        let play = document.createElement("div");
        play.setAttribute("class","play");
        videos[i].appendChild(play);
        videos[i].onclick = function() {

            let iframe = document.createElement("iframe");
            let iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay&autohide=1&enablejsapi=1&";

            if (this.getAttribute("data-params")){
                iframe_url += '&' + this.getAttribute("data-params");
            }

            iframe.classList.add("iframe");
            iframe.setAttribute("src", iframe_url);
            iframe.setAttribute("frameborder",'0');
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("id", videos[i].dataset.iframeId || idName());

            iframe.style.width  = this.offsetWidth + "px";
            iframe.style.height = this.offsetHeight + "px";

            this.parentNode.replaceChild(iframe, this);
        }
    }

    function idName(){
        let name = "video_";

        let idN = (Math.random() * 100).toFixed(5).toString().replace(".", "");

        return name + idN;
    }
}