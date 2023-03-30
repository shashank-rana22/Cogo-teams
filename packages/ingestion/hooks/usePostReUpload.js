import { useForm } from '@cogoport/forms';

function usePostReUpload() {
	const formProps = useForm();
	const gg = 'dkjbvdhf';

	console.log('formProps:::::', formProps);
	return {
		formProps,
		gg,
	};
}

export default usePostReUpload;
