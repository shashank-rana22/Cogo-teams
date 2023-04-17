import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetBusiness = (props) => {
	const {
		setValue = () => {},
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
				} = response.data || {};

				setValue('name', trade_name || business_name || '');
				setValue('pincode', (!isEmpty(addresses) && (addresses[0] || {}).pincode) || '');
				setValue('address', (!isEmpty(addresses) && (addresses[0] || {}).address) || '');
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, gstNumber, setValue]);

	return {
		data,
	};
};

export default useGetBusiness;
