import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import { controls } from '../configurations/create-controls';
import functionSubFunctionMapping from '../configurations/function-sub-function-mapping';

const useCreateRole = ({
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) => {
	const [errors, setErrors] = useState();

	const formProps = useForm();

	// const subRoleFunctionOptions = [];
	// type?.forEach((subType) => {
	// 	subRoleFunctionOptions.push(...(functionSubFunctionMapping[subType] || []));
	// });

	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_auth_role',
		method : 'POST',
	});

	const onSubmit = async (values) => {
		if (!values) return;

		try {
			const payload = {
				...values,
				role_sub_functions : values?.role_sub_functions || [],
				stakeholder_type   : 'partner',
			};

			const response = await trigger({ data: payload });
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('Role created successfully...');

			onChangeShowCreateRoleModal(false);

			redirect(response?.data?.id);
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	};

	const onErrors = (errs, e) => {
		e?.preventDefault();
		setErrors({ ...errs });
	};

	return {
		controls,
		formProps,
		errors,
		onSubmit,
		onErrors,
		createRoleApi: {
			trigger, loading, data,
		},
	};
};

export default useCreateRole;
