import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useMarkEnrichmentComplete = () => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'feedback_request_status',
		method  : 'POST',
		authkey : 'post_allocation_feedback_request_status',
	}, { manual: true });

	const onEnrichmentClick = async ({ id, workflow, refetch = () => {} }) => {
		try {
			const payload = {
				id,
				status: workflow,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Request Submitted Successfully');

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		onEnrichmentClick,
		loading,
	};
};

export default useMarkEnrichmentComplete;
