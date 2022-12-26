import { useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components';
import { controls } from '../utils/controls';
import functionSubFunctionMapping from '../../../../../configurations/function-sub-function-mapping';

const useCreateRole = ({
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
}) => {
	const { scope } = useSelector(({ general }) => general);

	const [errors, setErrors] = useState();

	const formProps = useFormCogo(controls);

	const type = formProps?.watch('role_functions') || [];

	const subRoleFunctionOptions = [];
	type.forEach((subType) => {
		subRoleFunctionOptions.push(...(functionSubFunctionMapping[subType] || []));
	});

	formProps.fields.role_sub_functions.options = subRoleFunctionOptions;

	const createRoleApi = useRequest('post', false, scope)('/create_auth_role');

	const onSubmit = async (values) => {
		if (!values) return;

		try {
			const payload = {
				...values,
				role_sub_functions: values?.role_sub_functions || [],
				stakeholder_type: 'partner',
			};

			const response = await createRoleApi.trigger({ data: payload });
			if (response.hasError) {
				toast.error(response?.message || 'Something went wrong');
				return;
			}

			toast.success('Role created successfully...');

			onChangeShowCreateRoleModal(false);

			redirect(response?.data?.id);
		} catch (error) {
			toast.error(error?.message || 'Something went wrong');
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
		createRoleApi,
	};
};

export default useCreateRole;
