import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const BILLING_TYPE_MAPPING = {
	INDIVIDUAL : 'Individual',
	CORPORATE  : 'Corporate',
};

const useInsurance = ({ draftData = {}, formHook }) => {
	const [billingType, setBillingType] = useState('Corporate');

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
				currency           : invoiceDetails?.invoiceCurrency,
				cargoValue         : invoiceDetails?.invoiceValue,
				commodity          : cargoDetails?.policyCommodityId,
			};

			Object.entries(prefilValueHash).forEach(([controlKey, value]) => {
				setValue(controlKey, value);
			});

			setBillingType(BILLING_TYPE_MAPPING[billingDetails?.billingType]);
		}
	}, [draftData, setBillingType, setValue]);

	return {
		billingType, setBillingType,
	};
};

export default useInsurance;
