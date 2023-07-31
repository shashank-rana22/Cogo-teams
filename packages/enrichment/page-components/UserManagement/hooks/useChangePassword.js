import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useChangePassword = ({
	actionModal = {},
	setActionModal = () => {},
	refetch = () => {},
}) => {
	const [error, setError] = useState({});
	const [patternError, setPatternError] = useState('');

	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_user_password',
		method : 'post',
	}, { manual: false });

	const { handleSubmit, formState: { errors }, control, watch, getValues } = useForm();

	const watchPassword = watch('password');

	useEffect(() => {
		setError((previousErrors) => ({
			...previousErrors,
			password: {
				type    : 'custom',
				message : '',
			},
		}));

		setPatternError('');
	}, [watchPassword]);

	const onCreate = async (values = {}) => {
		try {
			const agentData = actionModal?.agentData || {};

			const payload = {
				id       : agentData?.user_id,
				name     : agentData?.name,
				password : values?.password,
			};

			await trigger({ data: payload });

			Toast.success('Password updated successfully!');

			refetch();
			setActionModal({});
		} catch (err) {
			setPatternError(getApiErrorString(err?.response?.data));
		}
	};

	const onError = (err) => {
		setError({ ...err });
	};

	return {
		error,
		onCreate,
		onError,
		loading,
		control,
		handleSubmit,
		errors,
		getValues,
		patternError,
	};
};

export default useChangePassword;
