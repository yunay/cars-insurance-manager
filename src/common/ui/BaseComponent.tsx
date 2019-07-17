import * as React from 'react';
import * as moment from 'moment';

export abstract class BaseComponent<TProps> extends React.Component<TProps, any>{

    protected displayDate(date: Date): string {
        if (date) {
            let result = moment(date);

            return result.toDate().toLocaleDateString("bg-BG")
        }

        return "";
    }

    protected displayCurrancyValue(value: any) {
        if (isNaN(value))
            return value;

        return parseFloat(value).toFixed(2);
    }
}