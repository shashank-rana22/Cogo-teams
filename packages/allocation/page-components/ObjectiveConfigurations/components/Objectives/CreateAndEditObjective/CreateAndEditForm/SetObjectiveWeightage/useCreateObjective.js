import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getCreateObjectivePayload from '../../../../../helpers/get-create-objective-payload';

const useCreateObjective = (props) => {
	const { formValues } = props;

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

			trigger({ data: payload });
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
