import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useCreateCompanyFeed = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/create_company_feed',
		method : 'post',
	}, { manual: true });

	const createCompanyFeed = useCallback(
		async ({ PAYLOAD }) => {
			try {
				await trigger({
					data: { payload: PAYLOAD },
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		},
		[trigger],
	);
	return { createCompanyFeed, data, loading };
};

export default useCreateCompanyFeed;
