import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

function useAllowReTest() {
	const {
		control, formState: { errors }, watch, setValue, handleSubmit,
	} = useForm();

	const [{ loading = false, data = {} }, trigger] = useRequest({
		method : 'post',
		url    : 'allow_re_test',
	}, { manual: true });

	const onSubmit = async (values) => {
		console.log('val', values);
		// try {
		// 	await trigger({
		// 		data: {
		// 			test_id,
		// 		},
		// 	});

		// 	setShowPublishModal(false);

		// 	refetchTest({ test_id });
		// } catch (err) {
		// 	Toast.error(getApiErrorString(err.response?.data));
		// }
	};

	return {
		watch,
		control,
		setValue,
		onSubmit,
		errors,
		handleSubmit,
	};
}

export default useAllowReTest;
