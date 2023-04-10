import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import getControls from '../configurations/create-form';

const useCreateUpdate = ({ selected }) => {
	const {
		handleSubmit,
		getValues,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useForm();

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_location',
			method : 'post',
		},
		{ manual: true },
	);

	const onCreate = async () => {
		const formattedValues = getValues();
		const payload = { ...formattedValues };

		try {
			const res = await trigger({ data: { ...payload } });
			if (res?.data) {
				Toast.success('Location created successfully');
			}
		} catch (error) {
			Toast.error('Something went wrong');
		}
	};
	const fields = getControls();
	useEffect(() => {
		(fields || []).map((item) => setValue(item.name, selected[item.name]));
	}, [fields, selected, setValue]);
	return {
		handleSubmit,
		errors,
		watch,
		control,
		loading,
		onCreate,
		fields,
	};
};

export default useCreateUpdate;
