module.exports = {
    log(message) {
        console.log(`${new Date().toISOString()}\t${message}`)
    },
    info(message) {
        console.info(`${new Date().toISOString()}\t${message}`)
    },
    debug(message) {
        console.debug(`${new Date().toISOString()}\t${message}`)
    },
    warn(message) {
        console.warn(`${new Date().toISOString()}\t${message}`)
    },
    error(message) {
        console.error(`${new Date().toISOString()}\t${message}`)
    }
};