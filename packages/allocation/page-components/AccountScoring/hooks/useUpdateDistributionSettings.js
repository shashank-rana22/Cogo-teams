import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

function useUpdateDistributionSettings() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'engagement_distribution_settings_attributes',
		method  : 'POST',
		authkey : 'post_allocation_engagement_distribution_settings_attributes',
	}, { manual: true });

	const onClickSave = async (formValues, onClose, refetch, preFilledList, performed_by_id) => {
		const valuesForPrefilling = [];

		preFilledList.forEach((element) => {
			const { id = '' } = element;

			const scores = { id };
			const scoring_criteria = {};

			Object.keys(formValues).forEach((item) => {
				const first_index = item.indexOf('_');

				if (id === item.substring(0, first_index)) {
					const attribute = item.substring(first_index + 1);

					scoring_criteria[attribute] = formValues[item];
				}
			});

			scores.scoring_criteria = scoring_criteria;

			if (!isEmpty(scores.scoring_criteria)) {
				valuesForPrefilling.push(scores);
			}
		});

		const setting_details = [];

		valuesForPrefilling.forEach((element) => {
			const obj = {};
			obj.setting_id = element.id || undefined;
			obj.lower_limit = element.scoring_criteria.range_from || undefined;
			obj.upper_limit = element.scoring_criteria.range_to || undefined;

			setting_details.push(obj);
		});

		console.log(setting_details);

		try {
			const payload = {
				performed_by_id,
				performed_by_type: 'agent',
				setting_details,
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
