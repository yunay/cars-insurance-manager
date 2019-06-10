import * as React from 'react';

export abstract class BaseComponent<TProps> extends React.Component<TProps,any>{

    protected displayDateFor(date:Date):string{
        if(date)
            return date.toLocaleDateString("bg-BG")

        return "";
    }
}