export default businessTime;

function businessTime(holiday, time, duration) {
    if(holiday === undefined || holiday.constructor.name !== 'Object') return 'holiday must exist as Object';
    if(holiday.start === undefined || holiday.start.constructor.name !== 'Date') return 'Start must exist as Date';    
    if(holiday.end === undefined || holiday.end.constructor.name !== 'Date') return 'End must exist as Date';
    if(time === undefined || time.constructor.name !== 'Date') return 'Time must exist as Date';
    if(duration === undefined || duration.constructor.name !== 'Number') return 'Duration must exist as Number';

    const { start, end } = holiday;
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
    return addTime(time, duration);
}

// @todo create test
const addTime = (date, duration) => {
    // loggerTime('addTime, date => ', date);
    // console.log('addTime, duration =>', duration);
    // @todo do a best approach and test it. Cloning date.
    const d = new Date(date.getTime());
    d.setSeconds(d.getSeconds() + duration);
    return d;
}

// @todo create test
const diffBetweenDates = (first, second) => {
    // loggerTime('diff, first => ', first);
    // loggerTime('diff, second =>', second);
    return (first.getTime() - second.getTime()) / 1000;
}

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