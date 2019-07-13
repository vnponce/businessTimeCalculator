module.exports = businessTime;

function businessTime(holiday, time, duration) {
    const { start, end } = holiday;
    loggerTime('start => ', start);
    loggerTime('end => ', end);
    loggerTime('time => ', time);
    console.log(duration);
    if(time >= start && time < end) {
        console.log('time < end');
        end.setSeconds(time.getSeconds() + duration);
        console.log(dateWithoutTimeZone(time));
        return end;
    }
    console.log('else time < end');
    time.setSeconds(time.getSeconds() + duration);
    return time;
}

function dateWithoutTimeZone(date) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
}

function loggerTime(string = '', date) {
    console.log(string, dateWithoutTimeZone(date));
}