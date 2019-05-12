import * as React from 'react';
import { InsurancesSearch } from './InsurancesSearch';
import { InsurancesResults } from './InsurancesResults';

export class Insurances extends React.Component<any, any> {

    render() {
        return <>
            <InsurancesSearch />
            <InsurancesResults />
        </>
    }
}