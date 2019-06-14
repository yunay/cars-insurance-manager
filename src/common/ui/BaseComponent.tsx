import * as React from 'react';
import { isMoment } from 'moment';

export abstract class BaseComponent<TProps> extends React.Component<TProps, any>{

    protected displayDateFor(date: Date): string {
        if (date) {
            if (isMoment(date))
                return date.toDate().toLocaleDateString("bg-BG")
            else
                return date.toLocaleDateString("bg-BG")
        }

        return "";
    }
}