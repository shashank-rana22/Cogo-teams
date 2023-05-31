import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useAddRate = () => {
	const { control, handleSubmit, watch } = useForm();
	const [errors, setErrors] = useState();

	const [{ loading }, trigger] = useRequest({
		url    : 'create_lcl_freight_rate',
		method : 'post',
	}, { manual: true });

	const postApi = async (values) => {
		console.log(values, 'values::');
		await trigger({
			params: { ...values },
		});
	};

	const value = watch();

	return {
		control,
		handleSubmit,
		loading,
		errors,
		postApi,
		value,
		setErrors,
	};
};

export default useAddRate;
