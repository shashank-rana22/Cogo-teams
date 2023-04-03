// import { Toast } from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useFeedback({
	answerData = {},
}) {
	const [isFeedbackAvailable, setIsFeedbackAvailable] = useState({ overall: false });

	const [answer, setAnswer] = useState(answerData?.answers?.[0]?.answer);

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/submit_feedback',
	}, { manual: true });

	const onSubmit = async (formValues) => {
		const payload = {
			...formValues,
			...isFeedbackAvailable,
			answer,
		};
		console.log('payload:: ', payload);

		// try {
		// 	const payload = {
		// 		...formValues,
		// 	};

		// 	await trigger({
		// 		data: payload,
		// 	});
		// } catch (error) {
		// 	Toast.error(getApiErrorString(error?.response));
		// }
	};

	useEffect(() => {
		setAnswer(answerData?.answers?.[0]?.answer);
	}, [answerData]);

	return {
		data,
		loading,
		isFeedbackAvailable,
		setIsFeedbackAvailable,
		handleSubmit,
		errors,
		control,
		onSubmit,
		answer,
		setAnswer,
	};
}

export default useFeedback;
