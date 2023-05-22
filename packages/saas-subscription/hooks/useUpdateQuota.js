import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateQuota = ({ id = '', modalChangeHandler }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_quota',
	}, { manual: true });

	const formHook = useForm({
		defaultValues: {
			action   : 'credit',
			is_addon : false,
		},
	});

	const submitHandler = useCallback(async (data) => {
		const { action, is_addon, quantity } = data || {};
		try {
			await trigger({
				data: {
					id,
					limit       : quantity,
					is_addon,
					action_name : action,
					event_name  : action,
				},
			});
			modalChangeHandler(true);
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [id, modalChangeHandler, trigger]);

	return {
		formHook, loading, submitHandler,
	};
};

export default useUpdateQuota;
