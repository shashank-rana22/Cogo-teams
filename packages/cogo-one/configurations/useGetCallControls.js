// import { asyncListPartnerUsers } from '@cogoport/forms/utils/getAsyncFields';
import { useSelector } from '@cogoport/store';

const useGetCallControls = () => {
	const profile = useSelector((state) => state.profile || {});

	const { id = '' } = profile?.user || {};

	const controls = [
		{
			label          : 'Agent',
			name           : 'agent',
			controllerType : 'asyncSelect',
			asyncKey       : 'list_chat_agents',
			initialCall    : true,
			value          : '',
			className      : 'escalation_field_controller',
			placeholder    : 'Select Agent',
			isClearable    : true,
			params         : { filters: { agentId: id || {} } },
		},
		{
			label          : 'User',
			name           : 'user',
			controllerType : 'asyncSelect',
			value          : '',
			asyncKey       : 'list_partner_users',
			className      : 'escalation_field_controller',
			placeholder    : 'Select User',
			isClearable    : true,
		},
		{
			label          : 'Mobile No',
			name           : 'mobile_no',
			controllerType : 'input',
			placeholder    : 'enter here',
			size           : 'md',
			type           : 'number',
		},
	];

	return controls;
};

export default useGetCallControls;
