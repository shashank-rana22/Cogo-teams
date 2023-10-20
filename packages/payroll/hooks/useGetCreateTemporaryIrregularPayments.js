import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetCreateTemporaryIrregularPayments = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_temporary_irregular_payments',
	}, { manual: true });

	const getCreateTempIrregularPayments = async (
		employeeIds = [],
		paymentAmount = 0,
		paymentType = '',
		description = '',
		taxRecoveryMethod = '',
		fromDate = '',
		interval = 0,
	) => {
		let promise = {};
		try {
			promise = await trigger({
				data: {
					metadata: {
						email_ids           : employeeIds,
						amount              : paymentAmount,
						payment_type        : paymentType,
						description,
						tds_recovery_method : taxRecoveryMethod,
						from_date           : fromDate,
						to_date             : '',
						recurring_interval  : interval,
						months_duration     : interval,
					},
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}

		return promise;
	};

	return { loading, data, getCreateTempIrregularPayments };
};

export default useGetCreateTemporaryIrregularPayments;
