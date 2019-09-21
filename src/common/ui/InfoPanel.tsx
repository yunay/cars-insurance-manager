import * as React from 'react'

interface InfoPanel {
    title: string;
    icon: string;
}

interface SingleItemInfoPanelProps extends InfoPanel {
    item: any;
}

interface MultipleItemInfoPanelProps extends InfoPanel {
    items: any[];

    /**Когато подаваме колекция с обекти трябва да опишем как да се показват. */
    displayItem?: (item:any) => any;
}

export const SingleItemInfoPanel = (props: SingleItemInfoPanelProps) => {
    return <div>
        <div>{props.title}</div>
        <div className="single-info-body text-dark"><i className={`${props.icon} mr-10 text-primary`}></i><span>{props.item}</span></div>
    </div>
}

export const MultipleItemInfoPanel = (props: MultipleItemInfoPanelProps) => {
    return <div>
        <div>{props.title}</div>
        <div className="single-info-body text-dark">
            {
                props.items && props.items.length > 0
                    ? props.items.map((item, key) => {
                        return <div key={key}><i className={`${props.icon} mr-10 text-primary`}></i><span>{props.displayItem ? props.displayItem(item) : item}</span></div>
                    })
                    : null
            }
        </div>
    </div>
}