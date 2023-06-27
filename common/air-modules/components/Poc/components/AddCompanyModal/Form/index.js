import { forwardRef } from 'react';

import CreateNewCompanyForm from './CreateNewCompanyForm';
import DefaultForm from './DefaultForm';
import SameAsBookingPartyForm from './SameAsBookingPartyForm';
import SelfAndTradePartyForm from './SelfAndTradePartyForm';

const FORM_MAPPING = {
	create_new_company    : CreateNewCompanyForm,
	same_as_booking_party : SameAsBookingPartyForm,
	self                  : SelfAndTradePartyForm,
	trade_partner         : SelfAndTradePartyForm,
};

function Form({ companyType = 'trade_partner', ...rest }, ref) {
	let SelectedForm = null;

	if (Object.keys(FORM_MAPPING).includes(companyType)) {
		SelectedForm = FORM_MAPPING[companyType];
	} else {
		SelectedForm = DefaultForm;
	}

	return <SelectedForm {...rest} companyType={companyType} ref={ref} />;
}

export default forwardRef(Form);
