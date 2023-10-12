import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const BILLING_TYPE_MAPPING = {
	INDIVIDUAL : 'Individual',
	CORPORATE  : 'Corporate',
};

const useCheckout = ({ draftData = {}, formHook, setBillingType }) => {
	const { setValue } = formHook;

	useEffect(() => {
		if (!isEmpty(draftData)) {
			const {
				billingDetails = {}, cargoDetails = {},
				invoiceDetails = {},
			} = draftData || {};

			setValue('pan_number', billingDetails?.panNumber);
			setValue('aadharNumber', billingDetails?.aadharNumber);
			setValue('cargoDescription', cargoDetails?.cargoDescription);
			setValue('packageDescription', cargoDetails?.packaging);
			setValue('transitDate', cargoDetails?.transitDate ? new Date(cargoDetails.transitDate) : null);
			setValue('coverageFrom', cargoDetails?.locationFrom);
			setValue('coverageTo', cargoDetails?.locationTo);
			setValue('invoiceNo', invoiceDetails?.invoiceNo);
			setValue('invoiceDate', invoiceDetails?.invoiceDate ? new Date(invoiceDetails.invoiceDate) : null);
			setValue('incoterm', cargoDetails?.incoterm);
			setBillingType(BILLING_TYPE_MAPPING[billingDetails?.billingType]);
		}
	}, [draftData, setBillingType, setValue]);
};

export default useCheckout;
