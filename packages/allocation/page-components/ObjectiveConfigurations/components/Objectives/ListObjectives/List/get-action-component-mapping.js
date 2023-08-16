import ObjectiveActivation from './Actions/ObjectiveActivation';
import ObjectiveDeactivation from './Actions/ObjectiveDeactivation';

const ACTION_COMPONENT_MAPPING = {
	activation: {
		size   : 'sm',
		render : ({ objectiveId, setShowActionModal, refetch }) => (
			<ObjectiveActivation
				objectiveId={objectiveId}
				setShowActionModal={setShowActionModal}
				refetch={refetch}
			/>
		),
	},
	deactivation: {
		size   : 'sm',
		render : ({ objectiveId, setShowActionModal, refetch }) => (
			<ObjectiveDeactivation
				objectiveId={objectiveId}
				setShowActionModal={setShowActionModal}
				refetch={refetch}
			/>
		),
	},
};

export default ACTION_COMPONENT_MAPPING;
