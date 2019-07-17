import { Moment, isMoment } from 'moment';

export const ObjectHelpers = {
    generateGuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

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