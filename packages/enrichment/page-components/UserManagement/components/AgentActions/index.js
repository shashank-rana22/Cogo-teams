import ChangePassword from './ChangePassword';
import OffboardAgent from './OffboardAgent';
import OnboardAgent from './OnboardAgent';

const COMPONENT_MAPPING = {
	onboard         : OnboardAgent,
	deactivate      : OffboardAgent,
	change_password : ChangePassword,

};

function AgentActions(props) {
	const {
		actionModal = {},
		setActionModal = () => {},
		refetch = () => {},
		loading = false,
	} = props;

	const Component = COMPONENT_MAPPING[actionModal?.type];

	return (

		<Component
			key={actionModal?.type}
			actionModal={actionModal}
			setActionModal={setActionModal}
			refetch={refetch}
			loading={loading}
		/>

	);
}

export default AgentActions;
