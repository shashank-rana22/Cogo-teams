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
				id                                   : '68f8a233-5387-4f33-a84a-739b10c97eac',
				version_id                           : '1',
				badge_name                           : 'nautical_ninja',
				description                          : 'description for the 1st badge',
				kam_expertise_event_configuration_id : '00245b2c-c754-400e-8dcf-bcbc18f90870',
				status                               : 'active',
				// performed_by_id                      : '00245b2c-c754-400e-8dcf-bcbc18f34598',
				// performed_by_type                    : 'sales_person',

			};

			await trigger({
				data: payload,
			});

			// listRefetch();

			// setShow(false);

			Toast.success('Badge Updated!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loading,
		onCheckPublish,
	};
}

export default useBadgeConfigurationAttributes;
