import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../common/Form/getFieldController';
import getAddBadgesControls from '../configurations/get-add-badges-control';

function useCreateBadgeConfiguration(props) {
	const { onClose, listRefetch, badgeItemData = {} } = props;

	const {
		badge_name,
		description: badge_description,
		bronze_details,
		silver_details,
		gold_details,
		expertise_configuration_detail_ids:event_ids,
	} = badgeItemData;

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
		&& (Number(Bronze_value) > 0)) {
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
							image_url : Bronze_img_value || bronze_details?.image_url,
							medal     : 'bronze',
						},
						{
							score     : Silver_value,
							image_url : Silver_img_value || silver_details?.image_url,
							medal     : 'silver',
						},
						{
							score     : Gold_value,
							image_url : Gold_img_value || gold_details?.image_url,
							medal     : 'gold',
						},
					],
				};

				if (!isEmpty(badgeItemData)) {
					payload.id = badgeItemData.id;
					payload.badge_details[0].badge_detail_id = bronze_details?.id;
					payload.badge_details[1].badge_detail_id = silver_details?.id;
					payload.badge_details[2].badge_detail_id = gold_details?.id;
				}

				await trigger({ data: payload });

				onClose();

				Toast.success(isEmpty(badgeItemData) ? 'Event Created !' : 'Event Updated !');

				listRefetch();
			} catch (error) {
				Toast.error(error?.response?.data?.error || 'Something went wrong');
			}
		} else if (Number(Bronze_value) <= 0) {
			Toast.error('Score schould be a positive value');
		} else {
			Toast.error('Provide Scores in proper order: Bronze < Silver < Gold');
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
