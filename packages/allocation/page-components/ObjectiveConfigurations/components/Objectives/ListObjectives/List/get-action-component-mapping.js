import ObjectiveActivation from './Actions/ObjectiveActivation';
import ObjectiveDeactivation from './Actions/ObjectiveDeactivation';

const ACTION_COMPONENT_MAPPING = {
	activation: {
		size   : 'sm',
		render : ({ objectiveId, setShowActionModal }) => (
			<ObjectiveActivation
				objectiveId={objectiveId}
				setShowActionModal={setShowActionModal}
			/>
		),
	},
	deactivation: {
		size   : 'sm',
		render : ({ objectiveId, setShowActionModal }) => (
			<ObjectiveDeactivation
				objectiveId={objectiveId}
				setShowActionModal={setShowActionModal}
			/>
		),
	},
};

export default ACTION_COMPONENT_MAPPING;
