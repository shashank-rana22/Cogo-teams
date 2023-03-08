import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getAddMasteryControls from '../configurations/get-add-mastery-controls';

function useCreateMasterConfiguration(props) {
	const { masteryListData, onClose, listRefetch } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_mastery_badge_configuration',
		authkey : 'post_allocation_kam_expertise_mastery_badge_configuration',
	});

	const formProps = useForm({
		defaultValues: {
			mastery_name : masteryListData.badge_name,
			badges       : masteryListData.medal_collection,
			// ToDo : image url -> handle using previous data
		},
	});

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

			onClose();

			listRefetch();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response.data));
		}
	};

	return {
		formProps,
		getAddMasteryControls,
		loading,
		onSave,
	};
}

export default useCreateMasterConfiguration;
