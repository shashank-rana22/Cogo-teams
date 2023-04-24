import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useEditEngagementScoringConfiguration() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'engagement_scoring_event_configurations',
		method  : 'POST',
		authkey : 'post_allocation_engagement_scoring_event_configurations',
	}, { manual: true });

	const onSave = async (formValues) => {
		try {
			const payload = {
				...formValues,
			};

			await trigger({ data: payload });
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return { onSave, loading };
}

export default useEditEngagementScoringConfiguration;
