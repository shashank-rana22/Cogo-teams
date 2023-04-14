import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useHeader = ({ fetchFaqKeyword = () => {} }) => {
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
			fetchFaqKeyword();
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
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
