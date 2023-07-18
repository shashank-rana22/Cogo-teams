import { useRef, useState } from 'react';

import GeneralConfiguration from './GeneralConfiguration';
import ObjectiveRequirements from './ObjectiveRequirements';

function SetObjective(props) {
	const { formValues, setFormValues } = props;

	const [generalConfigFormState, setGeneralConfigFormState] = useState('edit');

	const objReqRef = useRef({});
	const genConfigRef = useRef({});

	const onSaveGeneralConfig = () => {
		objReqRef.current?.resetObjectiveRequirementForm();
		objReqRef.current?.container?.scrollIntoView({ behavior: 'smooth' });

		setGeneralConfigFormState('saved');
	};

	const onResetGeneralConfig = () => {
		objReqRef.current?.resetObjectiveRequirementForm();
		genConfigRef.current?.scrollIntoView({ behavior: 'smooth' });

		setGeneralConfigFormState('edit');
	};

	return (
		<>
			<GeneralConfiguration
				ref={genConfigRef}
				formValues={formValues}
				setFormValues={setFormValues}
				onSaveCallback={onSaveGeneralConfig}
				onResetCallback={onResetGeneralConfig}
				disabled={generalConfigFormState === 'saved'}
			/>

			<ObjectiveRequirements
				ref={objReqRef}
				formValues={formValues}
				setFormValues={setFormValues}
				disabled={generalConfigFormState === 'edit'}
			/>
		</>
	);
}

export default SetObjective;
