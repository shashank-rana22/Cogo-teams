import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getAddMasteryControls from '../configurations/get-add-mastery-controls';

function useCreateMasterConfiguration(props) {
	const { masteryItemData = {}, listRefetch, setToggleScreen } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	}, { manual: true });

	const { badge_name, expertise_configuration_detail_ids, description } = masteryItemData;

	const formProps = useForm({
		defaultValues: {
			mastery_name      : badge_name,
			badges            : expertise_configuration_detail_ids,
			description_input : description,
		},
	});

	const onClose = () => {
		setToggleScreen('badge_details');
	};

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			mastery_name,
			badges,
			image_input,
			description_input,
		} = formValues || {};

		try {
			let payload = {
				badge_name                         : mastery_name,
				description                        : description_input,
				expertise_configuration_detail_ids : badges,
				expertise_configuration_type       : 'badge_configuration',
				badge_details                      : [
					{
						image_url : image_input?.finalUrl || masteryItemData?.mastery_details?.image_url,
						medal     : 'mastery',
					},
				],
			};

			if (!isEmpty(masteryItemData)) {
				payload = {
					...payload,
					id            : masteryItemData.id,
					badge_details : [{
						...payload.badge_details?.[0],
						badge_detail_id: masteryItemData?.mastery_details?.id,
					}],
				};
			}

			await trigger({ data: payload });

			onClose();

			Toast.success(isEmpty(masteryItemData) ? 'Master Badge Created !' : 'Master Badge Updated !');

			listRefetch();
		} catch (error) {
			Toast.error(error?.response?.data?.error || 'Something went wrong');
		}
	};

	return {
		formProps,
		getAddMasteryControls,
		loading,
		onSave,
		onClose,
	};
}

export default useCreateMasterConfiguration;
