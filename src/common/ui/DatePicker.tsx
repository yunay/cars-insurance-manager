import * as React from 'react';
import * as Datetime from 'react-datetime';
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
                <Datetime closeOnSelect={true} locale="bg" timeFormat={false} disableOnClickOutside={true} onChange={this.handleChange} value={this.props.value} />
                <div className="input-group-append">
                    <button disabled={true} className="btn btn-outline-primary" type="button"><i className="far fa-calendar-alt"></i></button>
                </div>
            </div>
        </>
    }

    handleChange(e: any) {
        this.props.onChange(e)
    }
}