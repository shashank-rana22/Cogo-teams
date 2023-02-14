import { useForm } from '@cogoport/forms';

import controls from '../utils/controls';

function useVendorServices() {
	const { handleSubmit, control, setValue, formState: { errors } } = useForm();

	return {
		controls,
		handleSubmit,
		control,
		setValue,
		errors,
	};
}

export default useVendorServices;
