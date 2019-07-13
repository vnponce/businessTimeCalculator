module.exports = businessTime;

function businessTime(holiday, time, duration) {
    const { start, end } = holiday;
    loggerTime('start => ', start);
    loggerTime('end => ', end);
    loggerTime('time => ', time);
    console.log(duration);
    if(time < start && addTime(time, duration) > start){
        const timeToStart = diffBetweenDates(start, time);
        console.log('timeToStart', timeToStart);
        const overlapingTime = diffBetweenDates(addTime(time, duration), addTime(start, duration));
        console.log('overlapingTime', overlapingTime);
        const endPlusOverlaping = addTime(end, overlapingTime);
        console.log(endPlusOverlaping);
        return endPlusOverlaping;
    }
    else if(time >= start && time < end) {
        console.log('time < end');
        return addTime(end, duration);
    }
    console.log('else time < end');
    const response = addTime(time, duration);
    loggerTime('response => ', response);
    return response;
}

// @todo create test
function addTime(date, duration) {
    loggerTime('addTime =>', date);
    const d = date;
    loggerTime('d =>', d);
    d.setSeconds(d.getSeconds() + duration);
    loggerTime('after->addTime =>', date);
    loggerTime('after->d =>', d);
    return d;
}

// @todo create test
function diffBetweenDates(first, second) {
    loggerTime('first => ', first);
    loggerTime('second => ', second);
    const diff = (first.getTime() - second.getTime()) / 1000;
    console.log('diff => ', diff);
    return diff;
}

// Timezone it was killing me when I was debuggin time
function dateWithoutTimeZone(date) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
}

function loggerTime(string = '', date) {
    console.log(string, dateWithoutTimeZone(date));
}