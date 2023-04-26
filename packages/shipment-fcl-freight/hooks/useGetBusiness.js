import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetBusiness = (props) => {
	const {
		gstNumber = '',
	} = props;

	const [{ data }, trigger] = useRequest({
		url    : '/get_business',
		method : 'get',
	});

	const getBusiness = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						identity_number : gstNumber,
						identity_type   : 'tax',
						country_code    : 'IN',
						provider_name   : 'cogoscore',
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, gstNumber]);

	useEffect(() => {
		getBusiness();
	}, [getBusiness]);

	return {
		data,
	};
};

export default useGetBusiness;
