import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const useGetBusiness = ({ gstNumber = '' }) => {
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
