import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdatePayroll = ({ setProceed = () => {} }) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_payroll',
	}, { manual: true });

	const router = useRouter();
	const updatePayroll = useCallback(
		async ({ payload }) => {
			try {
				await trigger({
					data: payload,
				});
				if (payload.status === 'cancelled') {
					Toast.success('Payroll cancelled successfully');
					router.push('/payroll');
				} else {
					setProceed((prev) => prev + GLOBAL_CONSTANTS.one);
				}
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data));
				router.push('/payroll/payroll');
			}
		},
		[router, setProceed, trigger],
	);

	return { loading, data, updatePayroll };
};

export default useUpdatePayroll;
