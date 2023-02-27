import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useBadgeConfiguration() {
	const [{ loading }, trigger] = useAllocationRequest({
		url    : 'post-allocation-kam-expertise-badge-details',
		method : 'POST',
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
