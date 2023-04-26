import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useEditEngagementScoringConfiguration() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'engagement_scoring_event_configurations_attributes',
		method  : 'POST',
		authkey : 'post_allocation_engagement_scoring_event_configurations_attributes',
	}, { manual: true });

	const onSave = async (formValues, engagement_type) => {
		try {
			const { single_item = [] } = formValues || {};
			const payload = {
				event_type         : engagement_type,
				event_type_details : single_item,
			};

			await trigger({ data: payload });
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return { onSave, loading };
}

export default useEditEngagementScoringConfiguration;
