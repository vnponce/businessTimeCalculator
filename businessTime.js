module.exports = businessTime;

function businessTime(holiday, time, duration) {
    const { start, end } = holiday;
    loggerTime('start => ', start);
    loggerTime('end => ', end);
    loggerTime('time => ', time);
    if(time < start && addTime(time, duration) > start){
        console.log('start before start and has overlaping, so needs to end before end');
        const timeToStart = diffBetweenDates(start, time);
        const overlapingTime = diffBetweenDates(addTime(time, duration), addTime(start, duration));
        const endPlusOverlaping = addTime(end, overlapingTime);
        return endPlusOverlaping;
    }
    if(time >= start && time < end) {
        console.log('time < end');
        return addTime(end, duration);
    }
    console.log('else time < end');
    return addTime(time, duration);
}

// @todo create test
function addTime(date, duration) {
    date.setSeconds(date.getSeconds() + duration);
    return date;
}

// @todo create test
function diffBetweenDates(first, second) {
    const diff = (first.getTime() - second.getTime()) / 1000;
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