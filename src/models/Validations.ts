import { ValidationHelpers } from '../common/helpers/ValidationHelpers';
import { Customer } from './customers/Customer';
import { Insurer } from './insurers/Insurer';
import { Insurance } from './insurances/Insurance';

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

export class InsuranceValidation {

    public validate(insurance: Insurance) {

        if (ValidationHelpers.isStringNullOrEmpty(insurance.customerId))
            return false;

        if (ValidationHelpers.isStringNullOrEmpty(insurance.insurerId))
            return false;

        if (ValidationHelpers.isStringNullOrEmpty(insurance.carRegNumber))
            return false;

        if (!insurance.installments || insurance.installments.length == 0)
            return false;

        return true;
    }
}