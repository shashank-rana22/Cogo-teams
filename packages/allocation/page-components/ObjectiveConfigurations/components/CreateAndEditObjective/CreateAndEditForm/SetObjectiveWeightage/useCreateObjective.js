import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import ACTIVE_MODE_KEYS_MAPPING from '../../../../constants/active-mode-keys-mapping';
import getCreateObjectivePayload from '../../../../helpers/get-create-objective-payload';
import validateTotalWeightage from '../../../../helpers/validate-total-weightage';

const { LIST } = ACTIVE_MODE_KEYS_MAPPING;

const useCreateObjective = (props) => {
	const { formValues, setActiveMode, flushRefCallback, t = () => {} } = props;

	const { control, setValue, getValues } = useForm();

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_attributes',
		method  : 'POST',
		authkey : 'post_allocation_objective_attributes',
	}, { manual: true });

	const onCreate = async ({ distribute_equally }) => {
		try {
			const payload = getCreateObjectivePayload(
				{ data: formValues, weightageData: getValues(), distribute_equally, t },
			);

			const { objective_weightages } = payload;

			const isValidWeightages = validateTotalWeightage({ objective_weightages });

			if (!isValidWeightages) {
				throw new Error(t('allocation:weight_sum_length_toast_error'));
			}

			await trigger({ data: payload });

			Toast.success(t('allocation:objectives_sent_for_vericification_toast'));

			setActiveMode(LIST);

			flushRefCallback();
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || err?.message
					|| t('allocation:unable_to_create_objective'),
			);
		}
	};

	return {
		control,
		setValue,
		createLoading: loading,
		onCreate,
	};
};

export default useCreateObjective;
