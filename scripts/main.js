var svgLogo = document.getElementById("svgLogo");
var svgLogo1 = document.getElementById("svgLogo1");
var canvas = document.querySelector('canvas');

// new variable currentSVG
let currentSVG = svgLogo

function reverseString(str) {
    return str.split("").reverse().join("");
}

document.getElementById('toggleColor').addEventListener('click', function(evt) {

        var cardTemplate = document.querySelector(".card")

        // Check current state
        if (evt.target.innerHTML === "Dark Theme") {
            cardTemplate.style.backgroundColor = "#191919";
            cardTemplate.firstElementChild.style.color = "white";
            evt.target.innerHTML = "Light Theme";
            document.getElementById("toggleColor").classList.remove('btn-dark');
            document.getElementById("toggleColor").classList.add('btn-light');
            svgLogo.classList.add("is-hidden");
            svgLogo1.classList.remove("is-hidden");

            // set currentSvg to first image
            currentSVG = svgLogo1

        } else {
            cardTemplate.style.backgroundColor = "white";
            cardTemplate.firstElementChild.style.color = "#6c757d ";
            evt.target.innerHTML = "Dark Theme";
            document.getElementById("toggleColor").classList.remove('btn-light');
            document.getElementById("toggleColor").classList.add('btn-dark');
            svgLogo.classList.remove("is-hidden");
            svgLogo1.classList.add("is-hidden");

            // set currentSvg to second image
            currentSVG = svgLogo

        }

    })
    // Function to download image
function triggerDownload(imgURI) {
    var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });
    var a = document.createElement('a');
    var str = document.getElementById('collegeName').value;
    a.setAttribute('download', "Hack_Club_".concat(str).concat(".png"));
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');

    a.dispatchEvent(evt);
}

// Add click event to download button
document.getElementById('myBtn').addEventListener('click', function() {
    changeCollegeName();
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var DOMURL = window.URL || window.webkitURL || window;

    // getting the content of the current svg
    let data = (new XMLSerializer()).serializeToString(currentSVG)

    var img = new Image();
    var svgBlob = new Blob([data], {
        type: 'image/svg+xml;charset=utf-8'
    });
    var url = DOMURL.createObjectURL(svgBlob);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        var imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

        triggerDownload(imgURI);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    img.src = url;
});



// Dynamic update of college name on keychange 
var keyChange = document.getElementById('collegeName');
keyChange.onkeyup = keyChange.onkeypress = function() {
    changeCollegeName();
}

function changeCollegeName() {
    var collegeName = reverseString(document.getElementById('collegeName').value);
    document.getElementById('logoName1').textContent = collegeName;
    document.getElementById('logoName2').textContent = collegeName;
}
