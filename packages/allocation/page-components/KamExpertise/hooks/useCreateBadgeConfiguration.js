import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import { getFieldController } from '../../../common/Form/getFieldController';
import getAddBadgesControls from '../configurations/get-add-badges-control';

function useCreateBadgeConfiguration(props) {
	const { onClose, listRefetch, badgeListData = {} } = props;

	const { badge_name, description: badge_description, badge_details:badgeDetails } = badgeListData;

	const formProps = useForm({
		defaultValues: {
			badge        : badge_name,
			description  : badge_description,
			condition    : 'Dummy_Value',
			Bronze_value : badgeDetails?.[0]?.score,
			// Bronze_img_value : badgeDetails?.[0]?.image_url,
			Silver_value : badgeDetails?.[1]?.score,
			// Silver_img_value : badgeDetails?.[1]?.image_url,
			Gold_value   : badgeDetails?.[2]?.score,
			// Gold_img_value   : badgeDetails?.[1]?.image_url,
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

		if (Bronze_value < Silver_value && Silver_value < Gold_value) {
			try {
				const payload = {
					version_id             : '1',
					badge_name             : badge,
					description,
					event_configuration_id : condition,
					badge_details          : [
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

				if (Object.keys(badgeListData).length > 0) {
					payload.id = badgeListData.id;
					payload.badge_details[0].badge_detail_id = badgeDetails?.[0]?.id;
					payload.badge_details[1].badge_detail_id = badgeDetails?.[1]?.id;
					payload.badge_details[2].badge_detail_id = badgeDetails?.[2]?.id;
				}

				await trigger({ data: payload });

				onClose();

				Toast.success('Badge Created!');

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
