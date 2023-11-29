import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateReimbursements = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/update_reimbursement',
		method : 'post',
	}, { manual: true });

	const updateReiembursement = async (id, action, remark_text, refetchlist) => {
		try {
			await trigger({
				data: {
					reimbursement_id     : id,
					reimbursement_action : action,
					remarks              : remark_text || '-',
				},
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
