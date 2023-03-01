import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateBadgeConfiguration() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	});

	const onCheckPublish = async () => {
		try {
			const payload = {
				// performed_by_id                      : '123',
				// performed_by_type                    : 'user',
				version_id                           : '1',
				badge_name                           : 'nauvaovkaok',
				description                          : 'hgsdah',
				kam_expertise_event_configuration_id : '00245b2c-m9k8-479e-8dcf-bhnc9kk094820',
				status                               : 'active',
				badge_details                        : [
					{
						score     : '100',
						image_url : 'bjb',
						medal     : 'gold',
					},
					{
						score     : '75',
						image_url : 'bmbb',
						medal     : 'silver',
					},
					{
						score     : '50',
						image_url : 'hghjg',
						medal     : 'bronze',
					},
				],
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
