import { useForm } from '@cogoport/forms';

import getAddMasteryControls from '../configurations/get-add-mastery-controls';

function useCreateNewMastery(masteryListData = {}) {
	const formProps = useForm({
		defaultValues: {
			mastery_name : masteryListData.badge_name,
			badges       : masteryListData.medal_collection,
		},
	});

	return {
		formProps,
		getAddMasteryControls,
	};
}

export default useCreateNewMastery;
