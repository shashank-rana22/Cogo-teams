import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useUpdateBiasSettings() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'engagement_scoring_settings_attributes',
		method  : 'POST',
		authkey : 'post_engagement_scoring_settings_attributes',
	}, { manual: true });

	const onClickSave = async (formValues) => {
		const {
			first_half_age_from, first_half_age_to, first_half_multiplier,
			second_half_age_from, second_half_age_to, second_half_multiplier,
			third_half_age_from, third_half_age_to, third_half_multiplier,
			fourth_half_age_from, fourth_half_age_to, fourth_half_multiplier,
		} = formValues;
		try {
			// console.log('first_half_age_from : ', first_half_age_from);
			// console.log('first_half_age_to : ', first_half_age_to);
			// console.log('first_half_multiplier : ', first_half_multiplier);

			// console.log('second_half_age_from : ', second_half_age_from);
			// console.log('second_half_age_to : ', second_half_age_to);
			// console.log('second_half_multiplier : ', second_half_multiplier);

			// console.log('third_half_age_from : ', third_half_age_from);
			// console.log('third_half_age_to : ', third_half_age_to);
			// console.log('third_half_multiplier : ', third_half_multiplier);

			// console.log('fourth_half_age_from : ', fourth_half_age_from);
			// console.log('fourth_half_age_to : ', fourth_half_age_to);
			// console.log('fourth_half_multiplier : ', fourth_half_multiplier);

			console.log('initiation');

			const payload = {
				// performed_by_id   : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
				// performed_by_type : 'agent',
				// setting_type      : 'bias',
				// setting_details   : [
				// 	{
				// 		setting_id  : '5481fbd4-9ecb-4eed-9598-1ef9f42bf9fb',
				// 		lower_limit : first_half_age_from || undefined,
				// 		upper_limit : first_half_age_to || undefined,
				// 		score       : first_half_multiplier || undefined,
				// 	},
				// 	{
				// 		setting_id  : 'd6865582-11a2-43ea-866f-ed9a4307528c',
				// 		lower_limit : second_half_age_from || undefined,
				// 		upper_limit : second_half_age_to || undefined,
				// 		score       : second_half_multiplier || undefined,
				// 	},
				// 	{
				// 		setting_id  : '6e181d76-cd87-49e8-a075-b7f1d1c5c19f',
				// 		lower_limit : third_half_age_from || undefined,
				// 		upper_limit : third_half_age_to || undefined,
				// 		score       : third_half_multiplier || undefined,
				// 	},
				// 	{
				// 		setting_id  : '7736b653-290c-4123-87f0-2c4804fcf747',
				// 		lower_limit : fourth_half_age_from || undefined,
				// 		upper_limit : fourth_half_age_to || undefined,
				// 		score       : fourth_half_multiplier || undefined,
				// 	},
				// ],
				performed_by_id   : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
				performed_by_type : 'agent',
				setting_type      : 'bias',
				setting_details   : [
					{
						setting_id  : '5481fbd4-9ecb-4eed-9598-1ef9f42bf9fb',
						lower_limit : 0,
						upper_limit : 15,
						score       : 0.1,
					},
					{
						setting_id  : 'd6865582-11a2-43ea-866f-ed9a4307528c',
						lower_limit : 15,
						upper_limit : 30,
						score       : 0.7,
					},
					{
						setting_id  : '6e181d76-cd87-49e8-a075-b7f1d1c5c19f',
						lower_limit : 15,
						upper_limit : 30,
						score       : 0.7,
					},
					{
						setting_id  : '7736b653-290c-4123-87f0-2c4804fcf747',
						lower_limit : 0,
						upper_limit : 15,
						score       : 0.1,
					},
				],
			};

			console.log('processing');

			await trigger({
				data: payload,
			});

			console.log('updated!');

			Toast.success('Settings updated succesfully!!');
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'Something went wrong !');
		}
	};

	return {
		updateBias: onClickSave,
		loading,
	};
}

export default useUpdateBiasSettings;
