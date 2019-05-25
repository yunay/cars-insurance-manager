import * as React from 'react';
import * as Datetime from 'react-datetime';
import * as $ from 'jquery';

export class DatePicker extends React.Component<any, any>{
    render() {
        return <>
            <div className="input-group mb-2">
                <Datetime locale="bg" timeFormat={false} disableOnClickOutside={true} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.onCalendarIconClick}><i className="far fa-calendar-alt"></i></button>
                </div>
            </div>
        </>
    }

    onCalendarIconClick() {
        $('.rdt').toggleClass('rdtOpen');
    }
}