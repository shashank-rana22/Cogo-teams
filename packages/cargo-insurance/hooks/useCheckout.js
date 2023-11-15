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

			const prefilValueHash = {
				pan_number         : billingDetails?.panNumber,
				aadharNumber       : billingDetails?.aadharNumber,
				cargoDescription   : cargoDetails?.cargoDescription,
				packageDescription : cargoDetails?.packaging,
				transitDate        : cargoDetails?.transitDate ? new Date(cargoDetails.transitDate) : null,
				coverageFrom       : cargoDetails?.locationFrom,
				coverageTo         : cargoDetails?.locationTo,
				invoiceNo          : invoiceDetails?.invoiceNo,
				invoiceDate        : invoiceDetails?.invoiceDate ? new Date(invoiceDetails.invoiceDate) : null,
				incoterm           : cargoDetails?.incoterm,

			};

			Object.entries(prefilValueHash).forEach(([controlKey, value]) => {
				setValue(controlKey, value);
			});

			setBillingType(BILLING_TYPE_MAPPING[billingDetails?.billingType]);
		}
	}, [draftData, setBillingType, setValue]);
};

export default useCheckout;
