import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../../../../utils/toastApiError';

function useGetGstList({ registrationNumber }) {
	const [{ data }, trigger] = useRequest({
		url    : '/get_cogoscore_tax_numbers',
		method : 'GET',
	});

	useEffect(() => {
		(async () => {
			try {
				await trigger({
					params: {
						registration_number: registrationNumber,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, registrationNumber]);

	return {
		data,
	};
}

export default useGetGstList;
