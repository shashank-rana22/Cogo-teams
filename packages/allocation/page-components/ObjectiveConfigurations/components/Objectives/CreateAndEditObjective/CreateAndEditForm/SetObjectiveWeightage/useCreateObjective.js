import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import TAB_PANNEL_KEYS from '../../../../../constants/tab-pannel-keys-mapping';
import getCreateObjectivePayload from '../../../../../helpers/get-create-objective-payload';
import validateTotalWeightage from '../../../../../helpers/validate-total-weightage';

const { OBJECTIVES } = TAB_PANNEL_KEYS;

const useCreateObjective = (props) => {
	const { formValues, setActiveTabDetails } = props;

	const { control, setValue, getValues } = useForm();

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_attributes',
		method  : 'POST',
		authkey : 'post_allocation_objective_attributes',
	}, { manual: true });

	const onCreate = async ({ distribute_equally }) => {
		try {
			const payload = getCreateObjectivePayload(
				{ data: formValues, weightageData: getValues(), distribute_equally },
			);

			const { objective_weightages } = payload;

			const isValidWeightages = validateTotalWeightage({ objective_weightages });

			if (!isValidWeightages) {
				throw new Error('Weightage sum should be 100 for all users');
			}

			await trigger({ data: payload });

			Toast.success('Objective has been created and sent for verification. Please check after some time');

			setActiveTabDetails({ tab: OBJECTIVES, mode: 'list' });
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || err?.message
					|| 'Unable to Create Objective!!',
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
