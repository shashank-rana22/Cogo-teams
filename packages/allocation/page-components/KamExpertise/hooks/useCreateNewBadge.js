import { useForm } from '@cogoport/forms';

import getAddBadgesControls from '../configurations/get-add-badges-control';

function useCreateNewBadge() {
	const formProps = useForm();

	return {
		formProps,
		getAddBadgesControls,
	};
}

export default useCreateNewBadge;
