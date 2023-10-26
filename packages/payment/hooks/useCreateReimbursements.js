import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreateReimbursement = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/create_reimbursement',
		method : 'post',
	}, { manual: true });

	const createReimbursement = async ({ payload }) => {
		try {
			await trigger({
				data:	{ metadata: payload },
			});
			Toast.success('succesfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};
	return { createReimbursement, data, loading };
};

export default useCreateReimbursement;
