/*
 * Pineapple v2.3.0 (https://github.com/justintime50/pineapple)
 * CSS and Javascript web development library
 * Licensed under MIT (https://github.com/justintime50/pineapple/blob/main/LICENSE)
 */
const pineapple = {
    navFadeThreshold: 500,
    slideanimThreshold: 40,
    ajax: (content, onclickSelector = "pa-ajax-toggle", contentSelector = "pa-ajax-content") => {
        document.getElementById(onclickSelector).addEventListener("click", function(event) {
            const httpRequest = new XMLHttpRequest();
            httpRequest.open("GET", content);
            httpRequest.onreadystatechange = () => {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById(contentSelector).innerHTML = this.responseText;
                }
            };
            httpRequest.send();
        });
        return pineapple;
    },
    pageLoader: (interval = 1500) => {
        pineapple.pageLoaderInput = setTimeout(pineapple.showPage, interval);
        return pineapple;
    },
    showPage: () => {
        document.getElementById("pa-loader").style.display = "none";
        document.getElementById("pa-loader-div").style.display = "block";
        return pineapple;
    },
    countdown: {
        init: (timestamp, elementId, message) => {
            console.log("hit");
            pineapple.countdown.date = new Date(timestamp).getTime();
            const oneSecondMilliseconds = 1e3;
            let secondsInMinute, secondsInHour;
            secondsInMinute = secondsInHour = 60;
            const hoursInDay = 24;
            const x = setInterval(() => {
                const now = new Date().getTime();
                const timeDifference = pineapple.countdown.date - now;
                const days = Math.floor(timeDifference / (oneSecondMilliseconds * secondsInMinute * secondsInHour * hoursInDay));
                const hours = Math.floor(timeDifference % (oneSecondMilliseconds * secondsInMinute * secondsInHour * hoursInDay) / (oneSecondMilliseconds * secondsInMinute * secondsInHour));
                const minutes = Math.floor(timeDifference % (oneSecondMilliseconds * secondsInMinute * secondsInHour) / (oneSecondMilliseconds * secondsInMinute));
                const seconds = Math.floor(timeDifference % (oneSecondMilliseconds * secondsInMinute) / oneSecondMilliseconds);
                document.getElementById(elementId).innerHTML = "" + days + " days,&nbsp; " + hours + " hours,&nbsp; " + minutes + " minutes,&nbsp; " + seconds + " seconds ";
                if (timeDifference < 0) {
                    clearInterval(x);
                    document.getElementById(elementId).innerHTML = message;
                }
            }, oneSecondMilliseconds);
            return pineapple.countdown;
        }
    }
};

window.addEventListener("scroll", () => {
    const topOfWindow = document.body.scrollTop;
    const windowHeight = window.innerHeight;
    document.body.querySelectorAll(".pa-slideanim").forEach(element => {
        const position = element.getBoundingClientRect().top;
        if (position < topOfWindow + windowHeight - pineapple.slideanimThreshold) {
            element.classList.add("pa-slide");
        }
    });
    if (window.pageYOffset > pineapple.navFadeThreshold) {
        document.querySelectorAll(".pa-nav-fade").forEach(element => element.classList.add("opaque"));
        document.querySelectorAll(".pa-nav-fade a").forEach(element => element.classList.add("opaque"));
    } else {
        document.querySelectorAll(".pa-nav-fade").forEach(element => element.classList.remove("opaque"));
        document.querySelectorAll(".pa-nav-fade a").forEach(element => element.classList.remove("opaque"));
    }
});

module.exports = pineapple;