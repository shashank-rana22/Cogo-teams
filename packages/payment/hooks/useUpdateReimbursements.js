import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateReimbursements = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/update_reimbursement',
		method : 'post',
	}, { manual: true });

	const updateReiembursement = async ({ payload, action, refetchlist }) => {
		try {
			await trigger({
				data:	{ metadata: payload, action },
			});
			refetchlist();
			Toast.success('succesfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};
	return { updateReiembursement, data, loading };
};

export default useUpdateReimbursements;
