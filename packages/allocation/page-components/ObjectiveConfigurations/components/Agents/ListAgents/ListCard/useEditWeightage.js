import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

const DEFAULT_WEIGHTAGE = 100;
const DECIMAL_COUNT = 2;
const INDEX_LENGTH_NORMALIZATION = 1;

const useEditWeightage = (props) => {
	const { objectives, user, role, refetch } = props;

	const [mode, setMode] = useState('view');

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_weightages',
		method  : 'POST',
		authkey : 'post_allocation_objective_weightages',
	}, { manual: true });

	const DEFAULT_VALUES = {};
	objectives.forEach((objective) => {
		DEFAULT_VALUES[`${objective.objective_id}_weightage`] = objective.weightage;
	});

	const formProps = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const { setValue, reset } = formProps;

	const onSaveChanges = async (values) => {
		try {
			const payload = {
				objective_weightages: [
					{
						user_id                   : user?.id,
						role_id                   : role?.id,
						user_objective_weightages : Object.entries(values)?.map(([controlName, value]) => {
							const [objective_id] = controlName.split('_');

							return {
								objective_id,
								weightage : value,
								action    : 'update',
							};
						}),
					},
				],
			};

			await trigger({ data: payload });

			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	const onDistributeEqually = () => {
		if (isEmpty(objectives)) return;

		const objectivesCount = objectives.length;
		const equalWeight = (DEFAULT_WEIGHTAGE / objectivesCount).toFixed(DECIMAL_COUNT);
		let lastWeightage = 100.00;

		objectives.forEach((objective, index) => {
			if (index === objectivesCount - INDEX_LENGTH_NORMALIZATION) {
				setValue(`${objective.id}_weightage`, (lastWeightage).toFixed(DECIMAL_COUNT));
			} else {
				setValue(`${objective.id}_weightage`, equalWeight);
				lastWeightage -= equalWeight;
			}
		});
	};

	const onDiscardChanges = () => {
		setMode('view');
		reset();
	};

	return {
		mode,
		setMode,
		formProps,
		onSaveChanges,
		onDistributeEqually,
		onDiscardChanges,
		loading,
	};
};

export default useEditWeightage;
