import { useForm } from '@cogoport/forms';

import controls from '../utils/controls';

const useAddServicePoc = () => {
	console.log('c', controls);

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
	} = useForm();
	return {
		controls,
	};
};

export default useAddServicePoc;
