console.log('client js loaded')

function sendMessageToMenu(name, data) {
    let ce = new CustomEvent(name, {detail: data})
    window.parent.document.dispatchEvent(ce)
}

function onMenuMessage(name, callback) {
    window.document.addEventListener(name, function(e) {
        callback(e.detail)
    })
}

function waitForMilliseconds(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve()
        }, ms)
    })
}

window.addEventListener('load', function(e) {
    Client.init()
})

var Client = (function() {
    let init = function() {
        handleHandshake()
    }
    function handleHandshake() {
        onMenuMessage('handshake', function(data) {
            if(data.val) {
                waitForMilliseconds(10)
                .then(function() {
                    sendMessageToMenu('handshake-reply', {val: data.val})
                })
            }
        })        
    }
    return {
        init: init
    }
})()


