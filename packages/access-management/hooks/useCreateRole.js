import { Toast } from '@cogoport/components';
import { asyncFieldsPartner, useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import { controls } from '../configurations/create-controls';
import functionSubFunctionMapping from '../configurations/function-sub-function-mapping';

const useCreateRole = ({
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) => {
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

	const partnerOptions = useGetAsyncOptions({
		...asyncFieldsPartner(),
		initialCall: false,
	});

	const modifiedControls = controls(partnerOptions);

	return {
		controls      : modifiedControls,
		formProps,
		onSubmit,
		createRoleApi : {
			trigger, loading, data,
		},
	};
};

export default useCreateRole;
