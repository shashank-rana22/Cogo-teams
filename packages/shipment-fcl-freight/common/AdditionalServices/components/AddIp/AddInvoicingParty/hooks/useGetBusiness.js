import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import { getPanHolderStatus } from '../utils/getPanHolderStatus';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const INDIA_COUNTRY_DETAILS = getCountryDetails({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

const useGetBusiness = (props) => {
	const {
		watchTaxNumber = '',
		watchBusinessName = '',
		setValue = () => {},
		registrationNumberType = '',
		gstNumber = '',
	} = props;

	const [{ data }, trigger] = useRequest({
		url    : '/get_business',
		method : 'get',
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await trigger({
					params: {
						identity_number : gstNumber,
						identity_type   : 'tax',
						country_code    : 'IN',
						provider_name   : 'cogoscore',
					},
				});

				const {
					addresses = [],
					trade_name = '',
					business_name = '',
					business_type = '',
				} = response.data || {};

				setValue('name', trade_name || business_name || '');
				setValue('pincode', (!isEmpty(addresses) && (addresses[0] || {}).pincode) || '');
				setValue('address', (!isEmpty(addresses) && (addresses[0] || {}).address) || '');

				// const companyBasedOnPanNumber =	registrationNumberType === 'registration'
				// 	? getPanHolderStatus(watchTaxNumber)
				// 	: business_type || '';

				// if (watchTaxNumber.length === 10) {
				// 	setValues({
				// 		business_name : business_name || watchBusinessName || '',
				// 		company_type  : companyBasedOnPanNumber,
				// 	});
				// } else if (watchTaxNumber.length === 15) {
				// 	setValues({
				// 		tax_number : watchTaxNumber,
				// 		pincode    : (!isEmpty(addresses) && (addresses[0] || {}).pincode) || '',
				// 		address    : (!isEmpty(addresses) && (addresses[0] || {}).address) || '',
				// 		name       : trade_name || business_name || '',
				// 	});
				// } else {
				// 	setValues({
				// 		tax_number    : '',
				// 		pincode       : '',
				// 		address       : '',
				// 		name          : '',
				// 		business_name : '',
				// 		company_type  : '',
				// 	});
				// }
			} catch (error) {
				console.log(error);
			}
		})();
	}, [trigger, gstNumber]);

	return {
		data,
	};
};

export default useGetBusiness;
