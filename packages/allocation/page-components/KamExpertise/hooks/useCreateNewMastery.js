import { useForm } from '@cogoport/forms';

import getAddMasteryControls from '../configurations/get-add-mastery';

function useCreateNewMastery() {
	const formProps = useForm();

	return {
		formProps,
		getAddMasteryControls,
	};
}

export default useCreateNewMastery;
