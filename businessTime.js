export default businessTime;

function businessTime(holiday, time, duration) {
    const { start, end } = holiday;
    loggerTime('start =>', start);
    loggerTime('end =>', end);
    loggerTime('time =>', time);
    console.log('duration =>', duration);
    if(time < start && addTime(time, duration) > start){
        console.log('time before start and time+duration bigger than start')
        const overlapingTime = diffBetweenDates(addTime(time, duration), start);
        return addTime(end, overlapingTime);
    }
    else if(time >= start && time < end) {
        console.log('time is between start and end holiday, so add to end holiday duration');
        if(duration > 0) return addTime(end, duration);
        return addTime(start, duration);
    }
    console.log('else');
    const response = addTime(time, duration);
    loggerTime('response =>', response);
    return response;
}

// @todo create test
function addTime(date, duration) {
    loggerTime('addTime, date => ', date);
    console.log('addTime, duration =>', duration);
    // @todo do a best approach and test it. Cloning date.
    const d = new Date(date.getTime());
    d.setSeconds(d.getSeconds() + duration);
    return d;
}

// @todo create test
function diffBetweenDates(first, second) {
    // loggerTime('diff, first => ', first);
    // loggerTime('diff, second =>', second);
    return (first.getTime() - second.getTime()) / 1000;
}

// Timezone it was killing me when I was debuggin time
function dateWithoutTimeZone(date) {
    console.log('dwtz, date =>', date);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
}

function loggerTime(string = '', date) {
    console.log(date);
    console.log(string, dateWithoutTimeZone(date));
}