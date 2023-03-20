import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../common/Form/getFieldController';
import getAddBadgesControls from '../configurations/get-add-badges-control';

function useCreateBadgeConfiguration(props) {
	const { onClose, listRefetch, badgeItemData = {} } = props;

	const {
		badge_name,
		description: badge_description,
		badge_details:badgeDetails,
		expertise_configuration_detail_ids:event_ids,
	} = badgeItemData;

	const formProps = useForm({
		defaultValues: {
			badge        : badge_name,
			description  : badge_description,
			condition    : event_ids,
			Bronze_value : badgeDetails?.[0]?.score,
			Silver_value : badgeDetails?.[1]?.score,
			Gold_value   : badgeDetails?.[2]?.score,
			// ToDo : image url -> handle using previous data
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

		if (Number(Bronze_value) < Number(Silver_value) && Number(Silver_value) < Number(Gold_value)) {
			try {
				const payload = {
					version_id                         : '1',
					badge_name                         : badge,
					description,
					expertise_configuration_detail_ids : condition,
					expertise_configuration_type       : 'event_configuration',
					status                             : 'active',
					badge_details                      : [
						{
							score     : Bronze_value,
							image_url : Bronze_img_value || badgeDetails?.[0]?.image_url,
							medal     : 'bronze',
						},
						{
							score     : Silver_value,
							image_url : Silver_img_value || badgeDetails?.[1]?.image_url,
							medal     : 'silver',
						},
						{
							score     : Gold_value,
							image_url : Gold_img_value || badgeDetails?.[2]?.image_url,
							medal     : 'gold',
						},
					],
				};

				if (Object.keys(badgeItemData).length > 0) {
					payload.id = badgeItemData.id;
					payload.badge_details[0].badge_detail_id = badgeDetails?.[0]?.id;
					payload.badge_details[1].badge_detail_id = badgeDetails?.[1]?.id;
					payload.badge_details[2].badge_detail_id = badgeDetails?.[2]?.id;
				}

				await trigger({ data: payload });

				onClose();

				Toast.success(isEmpty(badgeItemData) ? 'Event Created !' : 'Event Updated !');

				listRefetch();
			} catch (error) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		} else {
			Toast.error('Provide Scores in proper order: Bronze < Silver <Gold');
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
