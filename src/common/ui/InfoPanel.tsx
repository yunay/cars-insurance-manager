import * as React from 'react'

interface InfoPanel {
    title: string;
    icon: string;
}

interface SingleItemInfoPanelProps extends InfoPanel {
    text: string;
}

interface MultipleItemInfoPanelProps extends InfoPanel {
    texts: string[];
}

export const SingleItemInfoPanel = (props: SingleItemInfoPanelProps) => {
    return <div>
        <div>{props.title}</div>
        <div className="single-info-body text-dark"><i className={`${props.icon} mr-10 text-primary`}></i><span>{props.text}</span></div>
    </div>
}

export const MultipleItemInfoPanel = (props: MultipleItemInfoPanelProps) => {
    return <div>
        <div>{props.title}</div>
        <div className="single-info-body text-dark">
            {
                props.texts && props.texts.length > 0
                    ? props.texts.map((text, key) => {
                        return <div key={key}><i className={`${props.icon} mr-10 text-primary`}></i><span>{text}</span></div>
                    })
                    : null
            }
        </div>
    </div>
}