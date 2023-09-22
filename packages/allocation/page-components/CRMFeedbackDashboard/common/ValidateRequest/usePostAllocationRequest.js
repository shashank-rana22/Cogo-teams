import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const usePostAllocationFeedback = ({
	t,
	onCloseModal,
	checkedRowsId,
	status,
	refetchFeedbackTable,
}) => {
	const [{ loading }, trigger] = useRequest({
		url     : '/feedback_status',
		method  : 'post',
		authkey : 'post_allocation_feedback',
	}, { manual: true });

	const requests = checkedRowsId.map((id) => ({
		feedback_id: id, is_valid_feedback: status === 'validate',
	}));

	const bulkUpdateEnrichmentRequest = async () => {
		try {
			await trigger({
				data: { requests },
			});

			Toast.success(t('allocation:validity_enrichment_request_success_toast'));
			refetchFeedbackTable();

			onCloseModal();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};
	return { bulkUpdateEnrichmentRequest, loading };
};

export default usePostAllocationFeedback;
