import { ValidationHelpers } from '../common/helpers/ValidationHelpers';
import { Customer } from './customers/Customer';
import { Insurer } from './insurers/Insurer';

export class CustomerValidation {

    public validate(customer: Customer) {

        if (ValidationHelpers.isStringNullOrEmpty(customer.firstname))
            return false;

        if (ValidationHelpers.isStringNullOrEmpty(customer.statementId))
            return false;

        if (ValidationHelpers.isStringNullOrEmpty(customer.phone))
            return false;

        return true;
    }
}

export class InsurerValidation {

    public validate(customer: Insurer) {

        if (ValidationHelpers.isStringNullOrEmpty(customer.name))
            return false;

        return true;
    }
}