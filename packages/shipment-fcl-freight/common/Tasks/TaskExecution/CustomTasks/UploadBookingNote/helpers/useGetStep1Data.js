import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

const useGetStep1Data = ({ setFileUrl = () => {} }) => {
	const formProps = useForm();
	const { watch } = formProps;
	const watchUrl = watch('url');

	useEffect(() => {
		// if (formValues?.url) {
		// 	setFileUrl(formValues.url);
		// }
	}, [watchUrl, setFileUrl]);

	return {
		formProps,
	};
};
export default useGetStep1Data;
