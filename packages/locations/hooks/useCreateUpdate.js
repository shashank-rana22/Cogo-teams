import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useCreateUpdate = () => {
	const { t } = useTranslation(['locations']);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_location',
		method : 'post',
	}, { manual: true });

	const {
		handleSubmit, getValues, control, formState: { errors },
		watch,
	} = useForm();

	const onCreate = async ({ data }) => {
		const formattedValues = data;
		// formattedValues.is_icd = formattedValues.is_icd === 'Yes';

		const payload = { ...formattedValues };

		try {
			const res = await trigger({ data });
			if (res?.data) {
				Toast.success(t('locations:location_created_successfully'));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return {
		handleSubmit,
		errors,
		watch,
		control,
		loading,
		onCreate,
	};
};

export default useCreateUpdate;
