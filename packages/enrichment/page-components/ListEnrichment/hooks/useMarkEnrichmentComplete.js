import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useMarkEnrichmentComplete = () => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'feedback_enrichment_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_enrichment_response',
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
		loading,
	};
};

export default useMarkEnrichmentComplete;
