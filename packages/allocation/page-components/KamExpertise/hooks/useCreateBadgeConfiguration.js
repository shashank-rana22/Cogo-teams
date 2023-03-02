import { Placeholder, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateBadgeConfiguration() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	});

	const onCheckPublish = async (payload_data) => {
		try {
			const payload = {
				version_id    : payload_data.version_id,
				badge_name    : payload_data.badge_name,
				description   : payload_data.description,
				// kam_expertise_event_configuration_id : '00245b2c-m9k8-479e-8dcf-bhnc9mkkwwvw930t45670',
				status        : 'active',
				badge_details : payload_data.badge_details,
			};

			await trigger({
				data: payload,
			});

			// listRefetch();

			// setShow(false);

			Toast.success('Checking for Publishability. Please check after some time.');
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
