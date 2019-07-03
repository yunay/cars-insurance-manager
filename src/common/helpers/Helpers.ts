import { Moment, isMoment } from 'moment';

export const ArrayHelpers = {
    distinct: function (arr: any[]) {
        return arr.filter((value: any, index: any, self: any) => {
            return self.indexOf(value) === index;
        })
    }
}

export const DateHelpers = {
    getDate: function (date: Date | Moment) {
        if (isMoment(date))
            return date.toDate();

        return date;
    }
}