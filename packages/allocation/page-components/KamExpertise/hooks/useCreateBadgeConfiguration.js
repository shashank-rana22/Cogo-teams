import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../common/Form/getFieldController';
import getControls from '../configurations/get-add-badges-control';

const FIRST_INDEX = 1;

const SECOND_INDEX = 2;

function useCreateBadgeConfiguration(props) {
	const { setToggleScreen, listRefetch, badgeItemData = {}, t = () => {} } = props;

	const {
		badge_name,
		description: badge_description,
		bronze_details,
		silver_details,
		gold_details,
		expertise_configuration_detail_ids:event_ids,
	} = badgeItemData;

	const getAddBadgesControls = getControls({ t });

	const formProps = useForm({
		defaultValues: {
			badge        : badge_name,
			description  : badge_description,
			condition    : event_ids,
			Bronze_value : bronze_details?.score,
			Silver_value : silver_details?.score,
			Gold_value   : gold_details?.score,
		},
	});

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration',
	}, { manual: true });

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			badge,
			condition,
			description,
			Bronze_value,
			Bronze_img_value,
			Silver_value,
			Silver_img_value,
			Gold_value,
			Gold_img_value,
		} = formValues || {};

		if ((Number(Bronze_value) < Number(Silver_value) && Number(Silver_value) < Number(Gold_value))
		&& (Number(Bronze_value) > GLOBAL_CONSTANTS.zeroth_index)) {
			try {
				const payload = {
					badge_name                         : badge,
					description,
					expertise_configuration_detail_ids : condition,
					expertise_configuration_type       : 'event_configuration',
					status                             : 'active',
					badge_details                      : [
						{
							score     : Bronze_value,
							image_url : Bronze_img_value?.finalUrl || bronze_details?.image_url,
							medal     : 'bronze',
						},
						{
							score     : Silver_value,
							image_url : Silver_img_value?.finalUrl || silver_details?.image_url,
							medal     : 'silver',
						},
						{
							score     : Gold_value,
							image_url : Gold_img_value?.finalUrl || gold_details?.image_url,
							medal     : 'gold',
						},
					],
				};

				if (!isEmpty(badgeItemData)) {
					payload.id = badgeItemData.id;
					payload.badge_details[GLOBAL_CONSTANTS.zeroth_index].badge_detail_id = bronze_details?.id;
					payload.badge_details[FIRST_INDEX].badge_detail_id = silver_details?.id;
					payload.badge_details[SECOND_INDEX].badge_detail_id = gold_details?.id;
				}

				await trigger({ data: payload });

				setToggleScreen('badge_details');

				Toast.success(`${t('allocation:badge_label')}${' '}
				${isEmpty(badgeItemData) ? t('allocation:created_successfully_label')
		: t('allocation:updated_successfully_label')}`);

				listRefetch();
			} catch (error) {
				Toast.error(error?.response?.data?.error || t('allocation:something_went_wrong'));
			}
		} else if (Number(Bronze_value) <= GLOBAL_CONSTANTS.zeroth_index) {
			Toast.default(t('allocation:score_should_be_a_positive'));
		} else {
			Toast.default(t('allocation:provide_scores_in_proper_order_toast'));
		}
	};

	return {
		loading,
		getAddBadgesControls,
		formProps,
		onSave,
		getFieldController,
	};
}

export default useCreateBadgeConfiguration;
