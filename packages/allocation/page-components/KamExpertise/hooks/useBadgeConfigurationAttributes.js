import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useBadgeConfigurationAttributes() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration_attributes',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration_attributes',
	});

	const onCheckPublish = async () => {
		try {
			const payload = {
				id                                   : '68f8a233-5387-4f33-a84a-739b00c97eac',
				version_id                           : '58b971cf-8931-4953-9f55-7f3343b1d4a2',
				badge_name                           : 'highway_hero',
				description                          : 'badge details posting',
				kam_expertise_event_configuration_id : '00245b2c-c754-400e-8dcf-bcbc18f33370',
				status                               : 'active',
				// performed_by_id                      : '00245b2c-c754-400e-8dcf-bcbc18f34598',
				// performed_by_type                    : 'sales_person',
				// kam_expertise_badge_config           : '00245b2c-c754-400e-8dcf-bcbc18f34786',
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

export default useBadgeConfigurationAttributes;
