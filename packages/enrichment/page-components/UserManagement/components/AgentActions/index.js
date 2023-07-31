import ChangePassword from './ChangePassword';
import OffboardAgent from './OffboardAgent';
import OnboardAgent from './OnboardAgent';

function AgentActions(props) {
	const {
		actionModal = {},
		setActionModal = () => {},
		refetch = () => {},
		loading = false,
	} = props;

	const COMPONENT_MAPPING = {
		onboard         : OnboardAgent,
		deactivate      : OffboardAgent,
		change_password : ChangePassword,

	};

	const Component = COMPONENT_MAPPING[actionModal?.type];

	return (

		<Component
			actionModal={actionModal}
			setActionModal={setActionModal}
			refetch={refetch}
			loading={loading}
		/>

	);
}

export default AgentActions;
