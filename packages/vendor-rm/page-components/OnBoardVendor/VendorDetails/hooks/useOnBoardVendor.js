import { useForm } from '@cogoport/forms';

import { controls } from '../utils/controls';

function useOnBoardVendor() {
	const {
		control,
		formState: { errors },
	} = useForm();

	return {
		controls,
		control,
		errors,
	};
}

export default useOnBoardVendor;
