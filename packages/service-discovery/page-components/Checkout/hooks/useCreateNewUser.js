import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import workScopes from '../constants/work-scope';

const controls = [
	{
		label       : 'Name',
		name        : 'name',
		placeholder : 'Enter name',
		type        : 'text',
		rules       : { required: 'Name is required' },
	},
	{
		label       : 'Email id',
		name        : 'email',
		placeholder : 'Enter email',
		type        : 'text',
		rules       : {
			required : 'Email is required',
			pattern  : { value: GLOBAL_CONSTANTS.regex_patterns.email, message: 'Please write valid email' },
		},
	},
	{
		label       : 'Mobile Number',
		name        : 'mobile_number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile-number-select',
		numberKey   : 'mobile_number',
		codeKey     : 'mobile_country_code',
		rules       : {
			required : true,
			validate : (value) => (value?.mobile_country_code && value?.mobile_number
				? true
				: 'Mobile Number is Required'),
		},
	},
	{
		label       : 'Whatsapp Number',
		name        : 'whatsapp_number',
		placeholder : 'Enter Whatsapp Number',
		type        : 'mobile-number-select',
		numberKey   : 'whatsapp_number',
		codeKey     : 'whatsapp_country_code',
	},
	{
		name          : 'work_scopes',
		label         : 'Work Scopes',
		placeholder   : 'Select work scopes',
		type          : 'multi-select',
		options       : workScopes,
		autoCloseMenu : false,
	},
];

const useCreateNewUser = ({
	setInvitedUser = () => {},
	organization_id,
	onCreate,
	branch_id,
}) => {
	// const { checkout_id } = useSelector(({ general }) => general.query || {});

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/onboard_organization_user',
	}, { manual: true });

	const { handleSubmit, control, formState:{ errors }, reset } = useForm();

	const createUser = async (values) => {
		try {
			// trackEvent(PARTNER_EVENT.checkout_created_ops_executive, {  Partner event
			// 	checkout_id,
			// 	ops_exec_name  : values.name,
			// 	ops_exec_email : values.email,
			// });
			if (values) {
				const { mobile_number = {}, whatsapp_number = {}, ...restValues } = values;

				const res = await trigger({
					data: {
						organization_id,
						organization_branch_id : branch_id,
						status                 : 'active',
						work_scopes            : values.work_scopes || [],
						...mobile_number,
						...whatsapp_number,
						...restValues,
					},
				});

				if (setInvitedUser) {
					setInvitedUser(res.data);
				}

				Toast.success('Added successfully');
				if (onCreate) {
					onCreate();
					reset();
				}
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Could not create user');
		}
	};

	return {
		control,
		createUser,
		handleSubmit,
		errors,
		controls,
		loading,
	};
};

export default useCreateNewUser;
