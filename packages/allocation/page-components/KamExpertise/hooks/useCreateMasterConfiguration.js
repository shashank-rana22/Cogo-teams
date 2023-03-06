import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useCreateMasterConfiguration(props) {
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_mastery_badge_configuration',
		authkey : 'post_allocation_kam_expertise_mastery_badge_configuration',
	});

	const { onClose } = props;

	const onSave = async (formValues, e) => {
		e.preventDefault();
		const { mastery_name, badges, image_input, description_input } = formValues;

		// badges array in payload is in the below format
		const badges_selected = [];
		(badges || []).forEach((badge) => {
			badges_selected.push({ name: badge });
		});

		try {
			const payload = {

				mastery_name,
				description            : description_input,
				event_configuration_id : '',
				status                 : 'active',
				image_url              : image_input,
				badges                 : badges_selected,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Master Badge Created!');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}

		onClose();
	};

	return {
		loading,
		onSave,
	};
}

export default useCreateMasterConfiguration;
