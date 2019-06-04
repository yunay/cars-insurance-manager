import * as AutoCompleteCmp from 'react-autocomplete';
import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const menuStyle: React.CSSProperties = {
    maxHeight: '150px',
    overflowX: 'hidden',
    display: 'block',
    width: '98%',
    zIndex: 100,
    background: 'white',
    marginTop: '0',
    borderRadius: '5px',
    left: 5,
    top: 70,
    position:'absolute',
    border: '1px solid rgba(90, 92, 105, 0.23)'
}

interface AutoCompleteProps {
    items?: any[];
    onSelect: (e: any) => void;
    onChange: (e: any) => void;
    shouldItemRender: (item: any, value: any) => boolean;
    getItemValue: (e: any) => string;
    renderItem: (item: any) => string;
}

@observer export class AutoComplete extends React.Component<AutoCompleteProps, any> {
    @observable inputValue: string = '';

    constructor(props: AutoCompleteProps) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.shouldItemRender = this.shouldItemRender.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        return <AutoCompleteCmp
            wrapperProps={{ className: 'd-block' }}
            inputProps={{ className: 'form-control' }}
            menuStyle={menuStyle}
            items={this.props.items ? this.props.items : []}
            shouldItemRender={this.shouldItemRender}
            getItemValue={this.getItemValue}
            renderItem={this.renderItem}
            value={this.inputValue}
            onChange={this.handleChange}
            onSelect={this.onSelect}
        />
    }

    getItemValue(item: any) {
        return this.props.getItemValue(item)
    }

    shouldItemRender(item: any, value: any) {
        return this.props.shouldItemRender(item, value)
    }

    handleChange(e: any) {
        this.inputValue = e.target.value;
        this.props.onChange(e.target.value);
    }

    renderItem(item: any, highlighted: boolean) {
        return <span key={item.key} className={`autocomplete-dropdown-item ${highlighted ? 'autocomplete-dropdown-item-highlighted' : ''}`} 
        onClick={(this.handleSelect.bind(this, item))}>
                {this.props.renderItem(item)}
            </span>
    }

    onSelect(e: any) {
        this.inputValue = e;
    }

    handleSelect(e: any, highlighted: any) {
        console.log('test');
        console.log(highlighted);
        this.props.onSelect(e);
    }
}