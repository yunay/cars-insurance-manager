import * as React from 'react';
import { Header } from './Header'

export class Layout extends React.Component<any, any> {

    render() {
        return (
            <>
                <Header />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
