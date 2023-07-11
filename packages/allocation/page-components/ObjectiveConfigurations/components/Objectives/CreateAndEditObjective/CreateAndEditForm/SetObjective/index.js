import GeneralConfiguration from './GeneralConfiguration';
import ObjectiveRequirements from './ObjectiveRequirements';

function SetObjective(props) {
	const { setFormValues } = props;

	return (
		<>
			<GeneralConfiguration setFormValues={setFormValues} />

			<ObjectiveRequirements />
		</>
	);
}

export default SetObjective;
