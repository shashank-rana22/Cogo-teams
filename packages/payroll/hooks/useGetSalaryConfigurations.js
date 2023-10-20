import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetSalaryConfigurations = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_salary_configurations',
	}, { manual: false });

	const additionalDetails = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						additional_details: true,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger],
	);

	useEffect(() => {
		additionalDetails();
	}, [additionalDetails]);

	return { loading, data };
};

export default useGetSalaryConfigurations;
