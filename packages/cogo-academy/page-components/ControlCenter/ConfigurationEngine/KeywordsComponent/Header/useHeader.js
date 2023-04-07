import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useHeader = () => {
	const [show, setShow] = useState(false);

	const [{ loading = false }, trigger] = useRequest({
		method : 'post',
		url    : '/create_faq_keyword',
	}, { manual: true });

	const { handleSubmit, control, formState: { errors } } = useForm();

	const onSubmit = async (values) => {
		try {
			const payload = { ...values };

			await trigger({ data: payload });

			setShow(false);
			Toast.success('Keyword created successfully!');
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		show,
		setShow,
		control,
		errors,
		handleSubmit,
		onSubmit,
		loading,
	};
};

export default useHeader;
