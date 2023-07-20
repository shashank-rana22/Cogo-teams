import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../../constants/create-form-stepper-keys-mapping';
import getCreateObjectivePayload from '../../../../../helpers/get-create-objective-payload';

const { SET_OBJECTIVE_WEIGHTAGE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

const useCreateObjective = (props) => {
	const { formValues, setActiveStep } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_attributes',
		method  : 'POST',
		authkey : 'post_allocation_objective_attributes',
	}, { manual: true });

	const onProceed = async () => {
		try {
			const payload = getCreateObjectivePayload({ data: formValues });

			await trigger({ data: payload });

			setActiveStep(SET_OBJECTIVE_WEIGHTAGE);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| 'Unable to Create Objective!!',
			);
		}
	};

	return {
		loading,
		onProceed,
	};
};

export default useCreateObjective;
