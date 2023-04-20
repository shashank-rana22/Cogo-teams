import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useUpdateDistributionSettings() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'engagement_distribution_settings_attributes',
		method  : 'POST',
		authkey : 'post_allocation_engagement_distribution_settings_attributes',
	}, { manual: true });

	const onClickSave = async (formValues, onClose, refetch, preFilledList, performed_by_id) => {
		const {
			flame_hot_range_from, flame_hot_range_to,
			hot_range_from, hot_range_to,
			warm_range_from, warm_range_to,
			cold_range_from, cold_range_to,
			icy_cold_range_from, icy_cold_range_to,
		} = formValues;

		try {
			const payload = {
				performed_by_id,
				performed_by_type : 'agent',
				setting_details   : [
					{
						setting_id  : preFilledList[0]?.id,
						lower_limit : flame_hot_range_from || undefined,
						upper_limit : flame_hot_range_to || undefined,
					},
					{
						setting_id  : preFilledList[1]?.id,
						lower_limit : hot_range_from || undefined,
						upper_limit : hot_range_to || undefined,
					},
					{
						setting_id  : preFilledList[2]?.id,
						lower_limit : warm_range_from || undefined,
						upper_limit : warm_range_to || undefined,
					},
					{
						setting_id  : preFilledList[3]?.id,
						lower_limit : cold_range_from || undefined,
						upper_limit : cold_range_to || undefined,
					},
					{
						setting_id  : preFilledList[4]?.id,
						lower_limit : icy_cold_range_from || undefined,
						upper_limit : icy_cold_range_to || undefined,
					},
				],
			};

			await trigger({
				data: payload,
			});

			refetch();

			onClose();

			Toast.success('Settings updated succesfully!!');
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'Something went wrong !');
		}
	};

	return {
		updateDistribution: onClickSave,
		loading,
	};
}

export default useUpdateDistributionSettings;
