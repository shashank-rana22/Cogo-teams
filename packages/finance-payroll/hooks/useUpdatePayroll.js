import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdatePayroll = ({ refetch = () => {} }) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_payroll',
	}, { manual: true });

	// const router = useRouter();
	const updatePayroll = useCallback(
		async ({ payload }) => {
			try {
				await trigger({
					data: payload,
				});

				console.log('refetch');
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
				// router.push('/payroll/payroll');
			}
			refetch();
		},
		[refetch, trigger],
	);

	return { loading, data, updatePayroll };
};

export default useUpdatePayroll;
