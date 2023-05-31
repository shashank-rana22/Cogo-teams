import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useRemoveEngagementScoringConfiguration({ refetch }) {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'remove_event_configuration',
		method  : 'POST',
		authkey : 'post_allocation_remove_event_configuration',
	}, { manual: true });

	const onDelete = async (engagement_type) => {
		try {
			const payload = {
				event_type: engagement_type,
			};

			await trigger({ data: payload });

			Toast.success('Configuration deleted successfully');

			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return { onDelete, mainDeleteLoading: loading };
}

export default useRemoveEngagementScoringConfiguration;
