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
		onboard  : OnboardAgent,
		offboard : OffboardAgent,

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
