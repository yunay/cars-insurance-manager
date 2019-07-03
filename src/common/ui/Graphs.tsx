import { Line } from 'react-chartjs-2';
import React = require('react');

interface GraphProps {
    data: number[];
    label: string;
    datasetColor: string;
    labels: string[];
}

export class LineGraph extends React.Component<GraphProps, any>{

    data = {
        labels: this.props.labels,
        datasets: [
            {
                label: this.props.label,
                fill: false,
                lineTension: 0,
                backgroundColor: this.props.datasetColor,
                borderColor: this.props.datasetColor,
                borderCapStyle: 'butt',
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.props.data
            }
        ]
    };

    render() {
        return <Line data={this.data} />
    }
}