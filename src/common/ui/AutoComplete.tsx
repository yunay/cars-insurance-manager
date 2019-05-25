import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer export class AutoComplete extends React.Component<any, any>{

    @observable searchedText: string = "";
    data: [][];

    constructor(props: any) {
        super(props);

        this.handleSearchedTextChange = this.handleSearchedTextChange.bind(this);
    }

    render() {
        return <span>
            <input type="text" value={this.searchedText} onChange={this.handleSearchedTextChange} />
            <span className="autocomplete-dropdown">
                <span className="autocomplete-dropdown-item">1</span>
                <span className="autocomplete-dropdown-item">2</span>
                <span className="autocomplete-dropdown-item">3</span>
            </span>
        </span>
    }

    handleSearchedTextChange(e: any) {

        this.searchedText = e.target.value;
    }
}