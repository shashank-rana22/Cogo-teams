import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateSalaryDetails = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_salary_details',
	}, { manual: true });

	const updateSalaryDetails = useCallback(
		async ({ payload }) => {
			try {
				await trigger({
					data: { metadata: payload },
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		},
		[trigger],
	);

	return { loading, data, updateSalaryDetails };
};

export default useUpdateSalaryDetails;
