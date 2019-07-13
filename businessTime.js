export default addBusinessTime;

function addBusinessTime(holiday, time, duration) {
    if(holiday === undefined || holiday.constructor.name !== 'Object') return 'holiday must exist as Object';
    if(holiday.start === undefined || holiday.start.constructor.name !== 'Date') return 'Start must exist as Date';    
    if(holiday.end === undefined || holiday.end.constructor.name !== 'Date') return 'End must exist as Date';
    if(time === undefined || time.constructor.name !== 'Date') return 'Time must exist as Date';
    if(duration === undefined || duration.constructor.name !== 'Number') return 'Duration must exist as Number';
    if(duration > Number.MAX_SAFE_INTEGER || duration < Number.MIN_SAFE_INTEGER) return 'Duration is not a permited JS number';

    const { start, end } = holiday;
    const endTime = addTime(time, duration);
    if(time < start && endTime > start){
        console.log('time before start and time+duration bigger than start')
        const overlapingTime = diffBetweenDates(endTime, start);
        return addTime(end, overlapingTime);
    }
    else if(time >= start && time < end) {
        console.log('time is between start and end holiday, so add to end holiday duration');
        if(duration > 0) return addTime(end, duration);
        return addTime(start, duration);
    }
    return endTime;
}

// @todo create test
const addTime = (date, duration) => {
    const d = new Date(date.getTime());
    d.setSeconds(d.getSeconds() + duration);
    return d;
}

// @todo create test
const diffBetweenDates = (first, second) => (first.getTime() - second.getTime()) / 1000;

// Timezone it was killing me when I was debuggin time
const dateWithoutTimeZone = (date) => {
    // console.log('dwtz, date =>', date);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
}

function loggerTime(string = '', date) {
    // console.log(date);
    console.log(string, dateWithoutTimeZone(date));
}