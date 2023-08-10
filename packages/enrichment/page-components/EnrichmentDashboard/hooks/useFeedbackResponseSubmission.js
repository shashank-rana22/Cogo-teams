import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useFeedbackResponseSubmission = (props) => {
	const {
		refetchStats = () => { },
		setActionModal = () => { },
		actionModal = {},
		refetch = () => {},
	} = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback_response_submission',
		method  : 'post',
		authkey : 'post_allocation_feedback_response_submission',
	}, { manual: true });

	const onEnrichmentClick = async () => {
		try {
			const payload = {
				feedback_request_id : actionModal?.requestData?.id,
				status              : actionModal?.requestData?.workflow,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Congratulations!!! Response Saved Successfully.');

			setActionModal(() => ({ show: false }));

			refetch();
			refetchStats();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onEnrichmentClick,
		loadingAction: loading,
	};
};

export default useFeedbackResponseSubmission;
