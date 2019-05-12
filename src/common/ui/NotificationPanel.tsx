import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export enum NotificationType { success = "success", primary = "primary", info = "info", warning = "warning", danger = "danger" }

interface NotificationPanelProps {
    notificationType: NotificationType;
    isDismisable: boolean;
    text: string;
}

@observer export class NotificationPanel extends React.Component<NotificationPanelProps, any>{
    notificationPanel: any = null;
    @observable isDismisedNotification: boolean = false;

    constructor(props: NotificationPanelProps) {
        super(props);

        this.closeNotificationPanel = this.closeNotificationPanel.bind(this);
    }

    render() {

        if (this.isDismisedNotification)
            return null

        return <div className={`alert alert-${this.props.notificationType}`}><i className={`notification-panel-icon ${this.defineNotificationIcon()}`}></i>{this.props.text}
            {
                this.props.isDismisable
                    ? <button type="button" className="close" onClick={this.closeNotificationPanel}>
                        <span>&times;</span>
                    </button>
                    : null
            }
        </div>
    }

    closeNotificationPanel(){
        this.isDismisedNotification = true;
    }

    defineNotificationIcon(){
        switch(this.props.notificationType){
            case NotificationType.success: return 'far fa-thumbs-up';
            case NotificationType.primary: return 'far fa-smile';
            case NotificationType.info: return 'far fa-info';
            case NotificationType.warning: return 'fas fa-exclamation-triangle';
            case NotificationType.danger: return 'fas fa-exclamation-circle';
        }
    }
}