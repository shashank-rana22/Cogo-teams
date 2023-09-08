import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

const FIRST_INDEX = 1;

function useUpdatePercentileSettings() {
	const { t } = useTranslation(['allocation']);

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'engagement_scoring_settings_attributes',
		method  : 'POST',
		authkey : 'post_allocation_engagement_scoring_settings_attributes',
	}, { manual: true });

	const onClickSave = async (formValues, onClose, refetch, preFilledList) => {
		const VALUES_FOR_PREFILLING = [];

		preFilledList.forEach((element) => {
			const { id = '' } = element;

			const scores = { id };
			const SCORING_CRITERIA = {};

			Object.keys(formValues).forEach((item) => {
				const first_index = item.indexOf('_');
				if (id === item.substring(GLOBAL_CONSTANTS.zeroth_index, first_index)) {
					const attributeName = item.substring(first_index + FIRST_INDEX);

					SCORING_CRITERIA[attributeName] = formValues[item];
				}
			});

			scores.scoring_criteria = SCORING_CRITERIA;

			if (!isEmpty(scores)) {
				VALUES_FOR_PREFILLING.push(scores);
			}
		});

		const SETTING_DETAILS = [];

		VALUES_FOR_PREFILLING.forEach((element) => {
			const OBJ = {};
			OBJ.setting_id = element.id || undefined;
			OBJ.lower_limit = element.scoring_criteria.percentile_from || GLOBAL_CONSTANTS.zeroth_index;
			OBJ.upper_limit = element.scoring_criteria.percentile_to || undefined;
			OBJ.score = element.scoring_criteria.bias_score || undefined;

			SETTING_DETAILS.push(OBJ);
		});

		try {
			const payload = {
				setting_type    : 'percentile',
				setting_details : SETTING_DETAILS,
			};

			await trigger({
				data: payload,
			});

			refetch();

			onClose();

			Toast.success(t('allocation:settings_updated_successfully'));
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || t('allocation:something_went_wrong'));
		}
	};

	return {
		updatePercentile: onClickSave,
		loading,
	};
}

export default useUpdatePercentileSettings;
