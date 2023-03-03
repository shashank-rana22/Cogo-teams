import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateMasterConfiguration() {
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_mastery_badge_configuration',
		authkey : 'post_allocation_kam_expertise_mastery_badge_configuration',
	});

	const onMasterSubmit = async (payload_data = {}) => {
		try {
			const payload = {
				mastery_name           : payload_data.mastery_name,
				description            : payload_data.description,
				event_configuration_id : '',
				status                 : 'active',
				image_url              : payload_data.image_url,
				//! need to add badges through a different api  (can be done by list)
				// badges                 : payload_data.badges,
				badges                 : [
					{ name: 'nautical_ninja' },
					{ name: 'wings_silver' },
					{ name: 'wings_gold' },
				],
			};

			await trigger({
				data: payload,
			});

			Toast.success('Maste Badge Created!');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}
	};
	return {
		loading,
		onMasterSubmit,
	};
}

export default useCreateMasterConfiguration;
