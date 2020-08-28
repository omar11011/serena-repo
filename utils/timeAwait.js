const TimeAwait = (message, time) => {
    let text = 'you still have to wait '

    if(time < 60) text += time + ' seconds.'
    
    else if(time >= 60 && time < 3600) {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60

        if(seconds < 1) {
            if(minutes < 2) text += minutes + ' minute.'
            else text += minutes + ' minutes.'
        }
        else {
            if(minutes < 2) text += minutes + ' minute and ' + seconds + ' seconds.'
            else text += minutes + ' minutes and ' + seconds + ' seconds.'
        }
    }

    else if(time >= 3600 && time < 86400) {
        let hours = parseInt(time / 3600)
        let minutes = parseInt((time - (hours * 3600)) / 60)
        let seconds = time - (hours * 3600) - (minutes * 60)
        let s1 = ''
        let s2 = ''
        let s3 = ''

        if(hours > 1) s1 = 's'
        if(minutes > 1) s2 = 's'
        if(seconds > 1) s3 = 's'

        text += `${hours} hour${s1} ${minutes} minute${s2} ${seconds} second${s3}.`
    }

    return text
}

module.exports = { TimeAwait }