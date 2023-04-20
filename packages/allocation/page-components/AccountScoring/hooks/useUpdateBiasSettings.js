import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

function useUpdateBiasSettings() {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'engagement_scoring_settings_attributes',
		method  : 'POST',
		authkey : 'post_allocation_engagement_scoring_settings_attributes',
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
					const attributeName = item.substring(first_index + 1);

					scoring_criteria[attributeName] = formValues[item];
				}
			});

			scores.scoring_criteria = scoring_criteria;

			if (!isEmpty(scores)) {
				valuesForPrefilling.push(scores);
			}
		});

		const setting_details = [];

		valuesForPrefilling.forEach((element) => {
			const obj = {};
			obj.setting_id = element.id || undefined;
			obj.lower_limit = element.scoring_criteria.age_from || undefined;
			obj.upper_limit = element.scoring_criteria.age_to || undefined;
			obj.score = element.scoring_criteria.multiplier || undefined;

			setting_details.push(obj);
		});

		try {
			const payload = {
				performed_by_id,
				performed_by_type : 'agent',
				setting_type      : 'bias',
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
		updateBias: onClickSave,
		loading,
	};
}

export default useUpdateBiasSettings;
