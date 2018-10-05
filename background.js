// chrome.webRequest.onBeforeRequest.addListener(function (details) {
//     return {
//         cancel: true
//     }
// },
//     { urls: ["*://*/*.js"] },
//     ["blocking"]);
function get_filesize(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true); // Notice "HEAD" instead of "GET",
    //  to get only the header
    xhr.onreadystatechange = function () {
        if (this.readyState == this.DONE) {
            callback(parseInt(xhr.getResponseHeader("Content-Length")));
        }
    };
    xhr.send();
}


chrome.webRequest.onCompleted.addListener(function (data) {
    console.log(data);
    get_filesize(data.url, function (size) {
        console.log("The size of " + data.url + " is: " + size + " bytes.");
    });
}, { urls: ['*://*/*.js'] },
    ['responseHeaders']);