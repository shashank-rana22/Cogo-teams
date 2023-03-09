import { useForm } from '@cogoport/forms';

import getAddRuleControls from '../configurations/get-add-rule-controls';

function useCreateNewEvent() {
	const formProps = useForm();

	const onSave = (formValues) => {
		console.log('formValues', formValues);
	};

	return {
		onSave,
		formProps,
		getAddRuleControls,
	};
}

export default useCreateNewEvent;
