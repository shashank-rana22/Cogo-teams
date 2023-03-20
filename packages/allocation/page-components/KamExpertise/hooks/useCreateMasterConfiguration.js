import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getAddMasteryControls from '../configurations/get-add-mastery-controls';

function useCreateMasterConfiguration(props) {
	const { masteryItemData = {}, onClose, listRefetch } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	}, { manual: true });

	const formProps = useForm({
		defaultValues: {
			mastery_name      : masteryItemData.badge_name,
			badges            : masteryItemData.expertise_configuration_detail_ids,
			description_input : masteryItemData.description,
			// ToDo : image url -> handle using previous data
		},
	});

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			mastery_name,
			badges,
			image_input,
			description_input,
		} = formValues || {};

		try {
			const payload = {
				version_id                         : '1',
				badge_name                         : mastery_name,
				description                        : description_input,
				expertise_configuration_detail_ids : badges,
				expertise_configuration_type       : 'badge_configuration',
				status                             : 'active',
				badge_details                      : [
					{
						image_url : image_input,
						medal     : mastery_name,
					},

				],
			};

			if (!isEmpty(masteryItemData)) {
				payload.id = masteryItemData.id;
				payload.badge_details[0].badge_detail_id = masteryItemData?.badge_details?.[0]?.id;
			}

			await trigger({ data: payload });

			onClose();

			Toast.success(isEmpty(masteryItemData) ? 'Master Badge Created !' : 'Master Badge Updated !');

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
