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
    initialValue?: string;
}

@observer export class AutoComplete extends React.Component<AutoCompleteProps, any> {
    @observable inputValue: string;
    private isSelected:boolean;

    constructor(props: AutoCompleteProps) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.shouldItemRender = this.shouldItemRender.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onMenuVisibilityChange = this.onMenuVisibilityChange.bind(this);

        this.inputValue = this.props.initialValue ? this.props.initialValue : "";
    }

    render() {
        return <AutoCompleteCmp
            wrapperProps={{ className: 'd-block' }}
            inputProps={{ className: 'form-control', type:"search" }}
            menuStyle={menuStyle}
            items={this.props.items ? this.props.items : []}
            shouldItemRender={this.shouldItemRender}
            getItemValue={(this.getItemValue)}
            renderItem={this.renderItem}
            value={this.inputValue}
            onChange={this.handleChange}
            onSelect={this.onSelect}
            onMenuVisibilityChange={this.onMenuVisibilityChange}
        />
    }

    getItemValue(item: any) {
        return item.id;
    }

    shouldItemRender(item: any, value: any) {
        return this.props.shouldItemRender(item, value)
    }

    handleChange(e: any) {
        this.isSelected = false;
        this.inputValue = e.target.value;
        this.props.onChange(e.target.value);
    }

    renderItem(item: any, highlighted: boolean) {
        return <span key={item.id} className={`autocomplete-dropdown-item ${highlighted ? 'autocomplete-dropdown-item-highlighted' : ''}`}>
                {this.props.renderItem(item)}
            </span>
    }

    onSelect(itemId: any) {
        let selectedItem = this.props.items.filter(x=>x.id == itemId)[0];
        this.isSelected = true;
        this.inputValue = this.props.getItemValue(selectedItem);
        this.props.onSelect(selectedItem);
    }

    onMenuVisibilityChange(isOpen:boolean){
        if(!isOpen && !this.isSelected)
            this.inputValue = "";
    }
}