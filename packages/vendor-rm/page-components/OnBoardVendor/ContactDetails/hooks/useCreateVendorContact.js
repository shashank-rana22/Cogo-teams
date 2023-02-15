import { useForm } from '@cogoport/forms';

import { getControls } from '../utils/getControls';

function useCreateVendorContact() {
	const fields = getControls();

	const {
		control,
		formState: { errors },
	} = useForm();

	return {
		fields,
		control,
		errors,
	};
}

export default useCreateVendorContact;
