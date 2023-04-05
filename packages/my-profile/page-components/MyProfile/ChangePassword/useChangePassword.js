import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useChangePassword = ({
	setShowModal = () => {},
	refetch = () => {},
	personDetails = {},
}) => {
	const {
		user_data: { auth_role_data },
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const [error, setError] = useState({});

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

	const hideOrganizationHierarchy = role_functions.includes('training')
	&& role_sub_functions.includes('training_general');

	return {
		error,
		onCreate,
		onError,
		loading,
		control,
		handleSubmit,
		hideOrganizationHierarchy,
		errors,
		getValues,
	};
};

export default useChangePassword;
