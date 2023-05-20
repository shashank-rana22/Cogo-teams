import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useUpdateQuota = ({ id = '', successHandler }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_quota',
	}, { manual: true });

	const formHook = useForm({
		defaultValues: {
			action   : 'credit',
			is_addon : 'false',
		},
	});

	const submitHandler = async (data) => {
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
			successHandler();
		} catch (err) {
			console.log(err);
		}
	};

	return {
		formHook, loading, submitHandler,
	};
};

export default useUpdateQuota;
