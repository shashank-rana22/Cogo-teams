import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateBadgeConfiguration(props) {
	const { listRefetch } = props;
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	});

	const onCheckPublish = async (payload_data = {}) => {
		try {
			const payload = {
				version_id             : payload_data.version_id,
				badge_name             : payload_data.badge_name,
				description            : payload_data.description,
				event_configuration_id : payload_data.event_configuration_id,
				badge_details          : payload_data.badge_details,
			};

			await trigger({
				data: payload,
			});

			// setShow(false);

			Toast.success('Badge Created!');

			listRefetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loading,
		onCheckPublish,
	};
}

export default useCreateBadgeConfiguration;
