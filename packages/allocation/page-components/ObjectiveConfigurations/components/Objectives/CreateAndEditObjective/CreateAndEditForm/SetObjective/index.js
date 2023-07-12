import { useRef } from 'react';

import GeneralConfiguration from './GeneralConfiguration';
import ObjectiveRequirements from './ObjectiveRequirements';

function SetObjective(props) {
	const { formValues, setFormValues } = props;

	const formRef = useRef({});

	return (
		<>
			<GeneralConfiguration
				formRef={formRef}
				formValues={formValues}
				setFormValues={setFormValues}
			/>

			<ObjectiveRequirements formRef={formRef} />
		</>
	);
}

export default SetObjective;
