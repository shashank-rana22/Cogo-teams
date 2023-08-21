import { Toast } from '@cogoport/components';
import { asyncFieldsPartner, useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { useAuthRequest } from '@cogoport/request';

import { controls } from '../configurations/create-controls';

const useCreateRole = ({
	onChangeShowCreateRoleModal = () => {},
	redirect = () => {},
	t = () => {},
}) => {
	const formProps = useForm();

	const [{ loading }, trigger] = useAuthRequest({
		url    : '/create_role',
		method : 'POST',
	}, { manual: true });

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
			Toast.error(error.response?.data.error || 'Something went wrong');
		}
	};

	const partnerOptions = useGetAsyncOptions({
		...asyncFieldsPartner(),
		initialCall: false,
	});

	const modifiedControls = controls(partnerOptions, t);

	return {
		controls      : modifiedControls,
		formProps,
		onSubmit,
		createRoleApi : { loading },
	};
};

export default useCreateRole;
