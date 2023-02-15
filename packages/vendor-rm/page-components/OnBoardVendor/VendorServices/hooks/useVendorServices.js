import { useForm } from '@cogoport/forms';

import controls from '../utils/controls';

function useVendorServices() {
	const { handleSubmit, control, setValue, formState: { errors }, ...rest } = useForm();

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
		...rest,
	};
}

export default useVendorServices;
