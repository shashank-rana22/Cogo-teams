import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useFeedbackResponseSubmission = () => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/feedback_response_submission',
		method  : 'post',
		authkey : 'post_allocation_feedback_response_submission',
	}, { manual: true });

	const onEnrichmentClick = async ({ id, workflow, refetch = () => {} }) => {
		try {
			const payload = {
				feedback_request_id : id,
				status              : workflow,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Enrichment Completed Successfully');

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onEnrichmentClick,
		loadingComplete: loading,
	};
};

export default useFeedbackResponseSubmission;
