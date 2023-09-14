import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getControls from '../configurations/get-add-mastery-controls';

function useCreateMasterConfiguration(props) {
	const { masteryItemData = {}, listRefetch, setToggleScreen, t = () => {} } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	}, { manual: true });

	const { badge_name, expertise_configuration_detail_ids, description } = masteryItemData;

	const getAddMasteryControls = getControls({ t });

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
						...payload.badge_details?.[GLOBAL_CONSTANTS.zeroth_index],
						badge_detail_id: masteryItemData?.mastery_details?.id,
					}],
				};
			}

			await trigger({ data: payload });

			onClose();

			Toast.success(isEmpty(masteryItemData) ? t('allocation:master_badge_created')
				: t('allocation:master_badge_updated'));

			listRefetch();
		} catch (error) {
			Toast.error(error?.response?.data?.error || t('allocation:sonething_went_wrong'));
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
