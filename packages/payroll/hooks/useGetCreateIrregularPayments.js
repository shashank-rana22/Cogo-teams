import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetCreateIrregularPayments = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_irregular_payments',
	}, { manual: true });

	const getCreateIrregularPayments = () => {
		try {
			trigger();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, data, getCreateIrregularPayments };
};

export default useGetCreateIrregularPayments;
