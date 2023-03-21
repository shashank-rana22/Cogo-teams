import { forwardRef } from 'react';

import CreateNewCompanyForm from './CreateNewCompanyForm';
import DefaultForm from './DefaultForm';
import SameAsBookingPartyForm from './SameAsBookingPartyForm';

function Form({ companyType = 'trade_partner', ...rest }, ref) {
	const mapping = {
		create_new_company    : CreateNewCompanyForm,
		same_as_booking_party : SameAsBookingPartyForm,
	};

	let SelectedForm = null;

	if (Object.keys(mapping).includes(companyType)) {
		SelectedForm = mapping[companyType];
	} else {
		SelectedForm = DefaultForm;
	}

	return <SelectedForm {...rest} companyType={companyType} ref={ref} />;
}

export default forwardRef(Form);
