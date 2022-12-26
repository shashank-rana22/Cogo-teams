import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';

import getControls from '../configurations/create-form';

const useCreateUpdate = () => {
	const {
		handleSubmit, getValues, control, formState: { errors },
		watch,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_location',
		method : 'post',
	}, { manual: true });

	const onCreate = async () => {
		const formattedValues = getValues();
		formattedValues.is_icd = formattedValues.is_icd === 'Yes';

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

	const locationOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),
		labelKey: 'name',
	});

	const fields = getControls({ locationOptions });

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
