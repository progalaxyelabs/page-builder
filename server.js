console.log('server js loaded')
var preview = document.getElementById('preview');

function sendMessageToPreview(name, data) {
    let ce = new CustomEvent(name, {detail: data})
    preview.contentDocument.dispatchEvent(ce)
}

function onPreviewMessage(name, callback) {
    window.document.addEventListener(name, function(e) {
        callback(e.detail)
    })
}

window.addEventListener('load', function(e) {
    Server.init()
})

var Server = (function() {
    let init = function() {
        performHandshake()
    }
    function performHandshake() {
        const handshakeTime = Date.now().toString();

        onPreviewMessage('handshake-reply', function(data) {
            if(data.val && (data.val === handshakeTime)) {
                console.log('handshake success')
            } else {
                console.warn('handshake fail')
            }
        })
        sendMessageToPreview('handshake', {val: handshakeTime})
    }
    return {
        init: init
    }
})()

