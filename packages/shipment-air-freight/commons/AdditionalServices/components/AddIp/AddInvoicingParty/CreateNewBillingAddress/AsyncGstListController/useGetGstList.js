import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetGstList({ registrationNumber }) {
	const [{ data }, trigger] = useRequest({
		url    : '/get_cogoscore_tax_numbers',
		method : 'GET',
	});

	const getGstList = useCallback(async () => {
		try {
			await trigger({
				params: {
					registration_number: registrationNumber,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, registrationNumber]);

	useEffect(() => {
		getGstList();
	}, [getGstList]);

	return {
		data,
	};
}

export default useGetGstList;
