import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useBadgeConfiguration() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	});
	const onCheckPublish = async () => {
		try {
			const payload = {
				version_id                           : '1',
				badge_name                           : 'nautical_ninja',
				description                          : 'description for the 1st badge',
				kam_expertise_event_configuration_id : '00245b2c-c754-400e-8dcf-bcbc18f33370',
				status                               : 'active',
				// performed_by_id                      : '00245b2c-c754-400e-8dcf-bcbc18f33780',
				// performed_by_type                    : 'sales_person',
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
		loadingCheckPublishability: loading,
		onCheckPublish,
	};
}

export default useBadgeConfiguration;
