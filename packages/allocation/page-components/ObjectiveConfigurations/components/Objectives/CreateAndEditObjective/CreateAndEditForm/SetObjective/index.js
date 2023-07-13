import { useRef } from 'react';

import GeneralConfiguration from './GeneralConfiguration';
import ObjectiveRequirements from './ObjectiveRequirements';

function SetObjective(props) {
	const { formValues, setFormValues } = props;

	const objReqRef = useRef({});

	const onSaveGeneralConfig = () => {
		objReqRef.current?.resetObjectiveRequirementForm();
		objReqRef.current?.container?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<GeneralConfiguration
				formValues={formValues}
				setFormValues={setFormValues}
				onSaveCallback={onSaveGeneralConfig}
			/>

			<ObjectiveRequirements ref={objReqRef} />
		</>
	);
}

export default SetObjective;
