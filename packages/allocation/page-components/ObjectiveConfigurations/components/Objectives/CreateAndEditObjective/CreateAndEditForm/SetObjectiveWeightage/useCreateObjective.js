import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import TAB_PANNEL_KEYS from '../../../../../constants/tab-pannel-keys-mapping';
import getCreateObjectivePayload from '../../../../../helpers/get-create-objective-payload';

const { OBJECTIVES } = TAB_PANNEL_KEYS;

const useCreateObjective = (props) => {
	const { formValues, setActiveTabDetails } = props;

	const [weightageData, setWeightageData] = useState({});

	const { control, watch } = useForm();

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_attributes',
		method  : 'POST',
		authkey : 'post_allocation_objective_attributes',
	}, { manual: true });

	const onCreate = async ({ distribute_equally }) => {
		try {
			const payload = getCreateObjectivePayload({ data: formValues, weightageData, distribute_equally });

			await trigger({ data: payload });

			Toast.success('Objective has been created and sent for verification. Please check after some time');

			setActiveTabDetails({ tab: OBJECTIVES, mode: 'list' });
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| 'Unable to Create Objective!!',
			);
		}
	};

	useEffect(() => {
		const subscription = watch((value, { name: controlName }) => {
			setWeightageData((previousValues) => ({
				...previousValues,
				[controlName]: value,
			}));
		});

		return () => subscription.unsubscribe();
	}, [watch, setWeightageData]);

	return {
		control,
		createLoading: loading,
		onCreate,
	};
};

export default useCreateObjective;
