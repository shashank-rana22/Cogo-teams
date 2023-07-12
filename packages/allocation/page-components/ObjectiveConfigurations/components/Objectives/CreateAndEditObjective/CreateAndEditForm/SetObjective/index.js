import GeneralConfiguration from './GeneralConfiguration';
import ObjectiveRequirements from './ObjectiveRequirements';

function SetObjective(props) {
	const { formValues, setFormValues } = props;

	return (
		<>
			<GeneralConfiguration
				formValues={formValues}
				setFormValues={setFormValues}
			/>

			<ObjectiveRequirements />
		</>
	);
}

export default SetObjective;
