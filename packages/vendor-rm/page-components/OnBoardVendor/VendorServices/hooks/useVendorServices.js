import { useForm } from '@cogoport/forms';

import controls from '../utils/controls';

function useVendorServices() {
	const { handleSubmit, control, setValue, formState: { errors } } = useForm();

	const onSubmit = (data) => {
		console.log('data:: ', data);
	};

	return {
		controls,
		handleSubmit,
		control,
		setValue,
		errors,
		onSubmit,
	};
}

export default useVendorServices;
