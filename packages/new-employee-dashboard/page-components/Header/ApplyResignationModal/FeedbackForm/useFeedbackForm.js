import { useForm } from '@cogoport/forms';

import controls from './controls';

const useFeedbackForm = () => {
	const {
		control, formState:
		// { errors }, handleSubmit,
	} = useForm();

	return { control, controls };
};

export default useFeedbackForm;
