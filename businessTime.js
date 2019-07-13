export default businessTime;

function businessTime(holiday, time, duration) {
    const { start, end } = holiday;
    if(time < start && addTime(time, duration) > start){
        const overlapingTime = diffBetweenDates(addTime(time, duration), start);
        return addTime(end, overlapingTime);
    }
    else if(time >= start && time < end) {
        if(duration > 0) return addTime(end, duration);
        return addTime(start, duration);
    }
    return addTime(time, duration);
}

// @todo create test
function addTime(date, duration) {
    // @todo best this approach and test it. Cloning date.
    const d = new Date(date.getTime());
    d.setSeconds(d.getSeconds() + duration);
    return d;
}

// @todo create test
function diffBetweenDates(first, second) {
    return (first.getTime() - second.getTime()) / 1000;
}

// Timezone it was killing me when I was debuggin time
function dateWithoutTimeZone(date) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
}

function loggerTime(string = '', date) {
    console.log(string, dateWithoutTimeZone(date));
}