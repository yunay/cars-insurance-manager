import * as React from 'react';
import * as Datetime from 'react-datetime';
import * as $ from 'jquery';
import * as moment from 'moment';

interface DatePickerProps {
    onChange: (e: any) => void;
    value: moment.Moment | Date;
}

export class DatePicker extends React.Component<DatePickerProps, any>{

    constructor(props: DatePickerProps) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return <>
            <div className="input-group mb-2">
                <Datetime locale="bg" timeFormat={false} disableOnClickOutside={true} onChange={this.handleChange} value={this.props.value} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.onCalendarIconClick}><i className="far fa-calendar-alt"></i></button>
                </div>
            </div>
        </>
    }

    onCalendarIconClick() {
        $('.rdt').toggleClass('rdtOpen');
    }

    handleChange(e: any) {
        this.props.onChange(e)
    }
}