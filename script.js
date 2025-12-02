const bar = document.getElementById('bar');     // hamburger menu icon
const close = document.getElementById('close');     // close button icon
const nav = document.getElementById('navbar');      // navbar element

// If the hamburger menu icon exists, add a click event listener
if (bar) {
    bar.addEventListener('click', () => {
        // add the 'active' class to the navbar to show it (slide in from right)
        nav.classList.add('active');
    })
}

// If the close button exists, add a click event listener
if (close) {
    close.addEventListener('click', () => {
        // Remove the 'active' class from the navbar to hide it
        nav.classList.remove('active');
    })
}

var MainImg = document.getElementById("MainImg");
var smallimg = document.getElementsByClassName("small-img");

if (MainImg) { // Check if MainImg exists (only on sproduct.html)
    smallimg[0].onclick = function() {
        MainImg.src = smallimg[0].src;
    }
    smallimg[1].onclick = function() {
        MainImg.src = smallimg[1].src;
    }
    smallimg[2].onclick = function() {
        MainImg.src = smallimg[2].src;
    }
    smallimg[3].onclick = function() {
        MainImg.src = smallimg[3].src;
    }
}