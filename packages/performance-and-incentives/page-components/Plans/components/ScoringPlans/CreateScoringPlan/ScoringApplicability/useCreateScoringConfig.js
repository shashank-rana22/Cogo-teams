import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

import getScoreApplicableFormControls from '../../../../configurations/get-score-applicable-form-controls';

const useCreateScoringConfig = ({ data, editApplicability, setEditApplicability }) => {
	const { push, query: { mode } } = useRouter();

	const { control, formState: { errors }, handleSubmit, watch, setValue } = useForm({
		defaultValues: {
			cogo_entity_id : data.cogo_entity_id,
			role_function  : data.role_function,
			channel        : data.channel,
			role_ids       : data.role_ids,
			display_name   : data.display_name,
		},
	});

	const [watchCogoEntityId, watchRoleFunction, watchChannel] = watch(['cogo_entity_id', 'role_function', 'channel']);

	const controls = getScoreApplicableFormControls({
		watchCogoEntityId,
		watchRoleFunction,
		watchChannel,
		editApplicability,
	});

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'config',
		method  : 'POST',
		authkey : 'post_agent_scoring_config',
	}, { manual: true });

	const onCreateScoringConfig = async (values = {}) => {
		try {
			const { cogo_entity_id, role_function, channel, role_ids, display_name } = values;

			const res = await trigger({
				data: {
					cogo_entity_id,
					role_function,
					channel,
					role_ids,
					display_name,
					status: 'draft',
				},
			});

			Toast.success('Saved successfully!');

			await push(`/performance-and-incentives/plans?mode=${mode}&id=${res.data.id}`);

			setEditApplicability(false);
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
