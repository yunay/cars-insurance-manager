import * as React from 'react';
import * as moment from 'moment';

export abstract class BaseComponent<TProps> extends React.Component<TProps, any>{

    protected displayDateFor(date: Date): string {
        if (date) {
            let result = moment(date);

            return result.toDate().toLocaleDateString("bg-BG")
        }

        return "";
    }
}