import businessTime from './businessTime';

// Christmas 2019, 9pm Dec 24th to 9pm Dec 25th
const holiday = {
    start: new Date('2019-12-24T21:00:00'),
    end: new Date('2019-12-25T21:00:00')
};

test('Dec 1st plus 1hr must return Dec 1st at 1:00', () => {
    const expected = new Date('2019-12-01T01:00:00');
    expect(businessTime(holiday, new Date('2019-12-01T00:00:00'), 60 * 60)).toEqual(expected);
});

test('Dec 1st subs 1s must return Nov 30 at 23:59:59', () => {
    const expected = new Date('2019-11-30T23:59:59');
    expect(businessTime(holiday, new Date('2019-12-01T00:00:00'), -1)).toEqual(expected);
});

test('Dec 24 at 21:00 plus 1s must return Dec 25 at 21:00:01', () => {
    const expected = new Date('2019-12-25T21:00:01');
    expect(businessTime(holiday, new Date('2019-12-24T21:00:00'), 1)).toEqual(expected);
});

test('Dec 24 at 21:00 1s must return Dec 24 at 20:59:59', () => {
    const expected = new Date('2019-12-24T20:59:59');
    expect(businessTime(holiday, new Date('2019-12-24T21:00:00'), -1)).toEqual(expected);
});


test('Dec 24 at 20:30 plus 1h must return Dec 25 at 21:30:00', () => {
    const expected = new Date('2019-12-25T21:30:00');
    expect(businessTime(holiday, new Date('2019-12-24T20:30:00'), 60 * 60)).toEqual(expected);
});

test('Dec 25 at 00:00 plus 1s must return Dec 25 at 21:30:00', () => {
    const expected = new Date('2019-12-25T21:00:01');
    expect(businessTime(holiday, new Date('2019-12-25T00:00:00'), 1)).toEqual(expected);
});

test('Dec 25 at 00:00 subs 1s must return Dec 24 at 20:59:59', () => {
    const expected = new Date('2019-12-24T20:59:59');
    expect(businessTime(holiday, new Date('2019-12-25T00:00:00'), -1)).toEqual(expected);
});

// @todo test validate holiday object, start is date and end is date, also second arg must be date object and durations must be a integer