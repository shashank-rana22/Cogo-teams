import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

import getScoreApplicableFormControls from '../../../../configurations/get-score-applicable-form-controls';

const useCreateScoringConfig = () => {
	const { push } = useRouter();

	const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm();

	const [cogoEntityId, roleFunction, channel] = watch(['cogo_entity_id', 'role_function', 'channel']);

	const controls = getScoreApplicableFormControls({ cogoEntityId, roleFunction, channel });

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'config',
		method  : 'POST',
		authkey : 'post_agent_scoring_config',
	}, { manual: true });

	const onCreateScoringConfig = async ({ values = {} }) => {
		try {
			const res = await trigger({
				data: {
					cogo_entity_id : values.cogo_entity_id,
					role_function  : values.role_function,
					channel        : values.channel,
					role_ids       : values.role_ids,
					display_name   : values.display_name,
				},
			});

			push(`/performance-and-incentives/plans?id=${res.data.id}`);

			Toast.success('Saved successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		const subscription = watch((_, { name: controlName }) => {
			if (controlName === 'role_function') {
				setValue('channel', '');
			}
			if (controlName === 'channel' || controlName === 'cogo_entity_id') {
				setValue('role_ids', []);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, setValue]);

	return {
		controls,
		control,
		errors,
		handleSubmit,
		onCreateScoringConfig,
		loading,
	};
};

export default useCreateScoringConfig;
