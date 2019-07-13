import addBusinessTime from './businessTime';

// Christmas 2019, 9pm Dec 24th to 9pm Dec 25th
const holiday = {
    start: new Date('2019-12-24T21:00:00'),
    end: new Date('2019-12-25T21:00:00')
};

test('Dec 1st plus 1hr must return Dec 1st at 1:00', () => {
    const expected = new Date('2019-12-01T01:00:00');
    expect(addBusinessTime(holiday, new Date('2019-12-01T00:00:00'), 60 * 60)).toEqual(expected);
});

test('Dec 1st subs 1s must return Nov 30 at 23:59:59', () => {
    const expected = new Date('2019-11-30T23:59:59');
    expect(addBusinessTime(holiday, new Date('2019-12-01T00:00:00'), -1)).toEqual(expected);
});


test('Dec 24 at 21:00 plus 1s must return Dec 25 at 21:00:01', () => {
    const expected = new Date('2019-12-25T21:00:01');
    expect(addBusinessTime(holiday, new Date('2019-12-24T21:00:00'), 1)).toEqual(expected);
});

test('Dec 24 at 21:00 subs 1s must return Dec 24 at 20:59:59', () => {
    const expected = new Date('2019-12-24T20:59:59');
    expect(addBusinessTime(holiday, new Date('2019-12-24T21:00:00'), -1)).toEqual(expected);
});


test('Dec 24 at 20:30 plus 1h must return Dec 25 at 21:30:00', () => {
    const expected = new Date('2019-12-25T21:30:00');
    expect(addBusinessTime(holiday, new Date('2019-12-24T20:30:00'), 60 * 60)).toEqual(expected);
});

test('Dec 24 at 20:30 subs 1s must return Dec 24 at 20:29:59', () => {
    const expected = new Date('2019-12-24T20:29:59');
    expect(addBusinessTime(holiday, new Date('2019-12-24T20:30:00'), -1)).toEqual(expected);
});


test('Dec 25 at 00:00 plus 1s must return Dec 25 at 21:00:01', () => {
    const expected = new Date('2019-12-25T21:00:01');
    expect(addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), 1)).toEqual(expected);
});

test('Dec 25 at 00:00 subs 1s must return Dec 24 at 20:59:59', () => {
    const expected = new Date('2019-12-24T20:59:59');
    expect(addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), -1)).toEqual(expected);
});

// @todo test validate holiday object, start is date and end is date, also second arg must be date object and durations must be a integer
test('Holiday not exist must return an error', () => {
    const expected = 'holiday must exist as Object';
    expect(addBusinessTime()).toEqual(expected);
});

test('Wrong holiday format must return an error', () => {
    const expected = 'holiday must exist as Object';
    expect(addBusinessTime([])).toEqual(expected);
});

test('Start property not exist must return an error', () => {
    const expected = 'Start must exist as Date';
    expect(addBusinessTime({}, new Date('2019-12-25T00:00:00'), -1)).toEqual(expected);
});

test('Start property is not a Date must return an error', () => {
    const expected = 'Start must exist as Date';
    expect(addBusinessTime({start: 'not-date'}, new Date('2019-12-25T00:00:00'), -1)).toEqual(expected);
});

test('End property not exist must return an error', () => {
    const expected = 'End must exist as Date';
    expect(addBusinessTime({start: new Date()}, new Date('2019-12-25T00:00:00'), -1)).toEqual(expected);
});

test('End property is not a Date must return an error', () => {
    const expected = 'End must exist as Date';
    expect(addBusinessTime({start: new Date(), end: 'not-date'}, new Date('2019-12-25T00:00:00'), -1)).toEqual(expected);
});

test('Time property not exist must return an error', () => {
    const expected = 'Time must exist as Date';
    expect(addBusinessTime(holiday)).toEqual(expected);
});

test('Time property is not a Date must return an error', () => {
    const expected = 'Time must exist as Date';
    expect(addBusinessTime(holiday, 'not-date')).toEqual(expected);
});

test('Duration property not exist must return an error', () => {
    const expected = 'Duration must exist as Number';
    expect(addBusinessTime(holiday, new Date('2019-12-25T00:00:00'))).toEqual(expected);
});

test('Duration property is not a Date must return an error', () => {
    const expected = 'Duration must exist as Number';
    expect(addBusinessTime(holiday,new Date('2019-12-25T00:00:00'), 'not-int')).toEqual(expected);
});

test('Duration property is not bigger than JS permited', () => {
    const expected = 'Duration is not a permited JS number';
    const biggest = Number.MAX_SAFE_INTEGER + 1;
    expect(addBusinessTime(holiday,new Date('2019-12-25T00:00:00'), biggest)).toEqual(expected);
});

test('Duration property is not a Date must return an error', () => {
    const expected = 'Duration is not a permited JS number';
    const smallest = Number.MIN_SAFE_INTEGER - 1;
    expect(addBusinessTime(holiday,new Date('2019-12-25T00:00:00'), smallest)).toEqual(expected);
});
