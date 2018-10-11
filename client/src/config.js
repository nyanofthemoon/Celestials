let host     = window.location.hostname
let name     = 'production'
let port     = ''
let verbose  = false

if (['localhost', '127.0.0.1'].indexOf(host) > -1) {
    name     = 'development'
    port     = ':9000'
    verbose  = true
}

export default {
    environment: {
        name: name,
        host: host,
        port: port,
        isDevelopment: function() {
            return 'development' === name
        },
        isVerbose: function() {
            return true === verbose
	    }
    }
}
