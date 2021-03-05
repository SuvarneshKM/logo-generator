var svg = document.querySelector('svg');
var canvas = document.querySelector('canvas');

function reverseString(str) {
    return str.split("").reverse().join("");
}

// Function to download image
function triggerDownload(imgURI) {
    var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });

    var a = document.createElement('a');
    var str = document.getElementById('collegeName').value;
    a.setAttribute('download', "HackClub_".concat(str).concat(".png"));
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');

    a.dispatchEvent(evt);
}

// Add click event to download button
document.getElementById('myBtn').addEventListener('click', function () {
    changeCollegeName();
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svgBlob = new Blob([data], {
        type: 'image/svg+xml;charset=utf-8'
    });
    var url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
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
keyChange.onkeyup = keyChange.onkeypress = function () {
    changeCollegeName();
}
function changeCollegeName() {
    var collegeName = reverseString(document.getElementById('collegeName').value);
    document.getElementById('logoName').textContent = collegeName;
}