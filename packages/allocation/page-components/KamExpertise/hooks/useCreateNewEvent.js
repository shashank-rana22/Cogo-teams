import { useForm } from '@cogoport/forms';

import getAddRuleControls from '../configurations/get-add-rule-controls';
import getAttributeRuleControls from '../configurations/get-attribute-rule-controls';

function useCreateNewEvent() {
	const formProps = useForm();

	return {
		formProps,
		getAddRuleControls,
		getAttributeRuleControls,
	};
}

export default useCreateNewEvent;
