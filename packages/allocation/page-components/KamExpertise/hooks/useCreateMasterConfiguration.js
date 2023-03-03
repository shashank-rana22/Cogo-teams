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
				// performed_by_id        : null,
				// performed_by_type      : null,
				// version_id             : '1',
				// mastery_name           : null,
				// description            : null,
				// event_configuration_id : '',
				// status                 : 'active',
				// image_url              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvLI6YDUpfHdQI0Mu9r1VagQ4yrEbWFW6hs-hGtU&s',
				// badges                 : [
				// 	{
				// 		name: 'master modal',
				// 	},
				// ],
				
				mastery_name           : payload_data.mastery_name,
				description            : payload_data.description,
				event_configuration_id : '',
				status                 : 'active',
				image_url              : payload_data.image_url,
				badges                 : payload_data.badges,
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
