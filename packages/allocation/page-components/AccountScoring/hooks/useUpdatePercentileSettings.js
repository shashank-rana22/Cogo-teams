import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useUpdatePercentileSettings() {
	const [trigger] = useAllocationRequest({
		url    : 'post_engagement_scoring_settings_attributes',
		method : 'POST',
		athkey : 'post_engagement_scoring_settings_attributes',
		// params : {
		// 	setting_type: 'percentile',
		// },
	}, { manual: true });

	const onClickSave = async (formValues) => {
		const {
			flame_hot_percentile_from, flame_hot_percentile_to,
			flame_hot_bias_score, flame_hot_number_of_accounts,
			hot_percentile_from, hot_percentile_to, hot_bias_score, hot_number_of_accounts,
			warm_percentile_from, warm_percentile_to, warm_bias_score, warm_number_of_accounts,
			cold_percentile_from, cold_percentile_to, cold_bias_score, cold_number_of_accounts,
			icy_cold_percentile_from, icy_cold_percentile_to, icy_cold_bias_score,
			icy_cold_number_of_accounts,
		} = formValues;

		try {
			console.log('flame_hot_percentile_from : ', flame_hot_percentile_from);
			console.log('flame_hot_percentile_to : ', flame_hot_percentile_to);
			console.log('flame_hot_bias_score : ', flame_hot_bias_score);
			console.log('flame_hot_number_of_accounts : ', flame_hot_number_of_accounts);

			console.log('hot_percentile_from : ', hot_percentile_from);
			console.log('hot_percentile_to : ', hot_percentile_to);
			console.log('hot_bias_score : ', hot_bias_score);
			console.log('hot_number_of_accounts : ', hot_number_of_accounts);

			console.log('warm_percentile_from : ', warm_percentile_from);
			console.log('warm_percentile_to : ', warm_percentile_to);
			console.log('warm_bias_score : ', warm_bias_score);
			console.log('warm_number_of_accounts : ', warm_number_of_accounts);

			console.log('cold_percentile_from : ', cold_percentile_from);
			console.log('cold_percentile_to : ', cold_percentile_to);
			console.log('cold_bias_score : ', cold_bias_score);
			console.log('cold_number_of_accounts : ', cold_number_of_accounts);

			console.log('icy_cold_percentile_from : ', icy_cold_percentile_from);
			console.log('icy_cold_percentile_to : ', icy_cold_percentile_to);
			console.log('icy_cold_bias_score : ', icy_cold_bias_score);
			console.log('icy_cold_number_of_accounts : ', icy_cold_number_of_accounts);

			const payload = {

			};

			await trigger({
				data: payload,
			});

			Toast.success('Settings updated succesfully!!');
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'Something went wrong !');
		}
	};

	return {
		updatePercentile: onClickSave,
	};
}

export default useUpdatePercentileSettings;
