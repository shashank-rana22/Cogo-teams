import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useChangePassword = ({
	setShowModal = () => {},
	refetch = () => {},
	personDetails = {},
	// updatePasswordControls = () => {},
}) => {
	const [error, setError] = useState({});

	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_user_password',
		method : 'post',
	}, { manual: false });

	// const controls = updatePasswordControls();

	// const formProps = useForm(controls);

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
	}, [watchPassword]);

	const onCreate = async (values = {}) => {
		try {
			const payload = {
				id       : personDetails.user_id,
				name     : personDetails.name,
				password : values?.password,
			};

			await trigger({ data: payload });

			Toast.success('Password updated successfully!');

			refetch();
			setShowModal(false);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.data) || 'Invalid Password',
			);
		}
	};

	const onError = (err) => {
		setError({ ...err });
	};

	return {
		// controls,
		// formProps,
		error,
		onCreate,
		onError,
		loading,
		control,
		handleSubmit,
		errors,
		getValues,
	};
};

export default useChangePassword;
