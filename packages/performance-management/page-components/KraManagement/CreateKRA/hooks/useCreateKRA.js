import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const LENGTH_OF_ARRAY = 5;
const INCREMENTAL_ELEMENT = 1;

const getPayload = (values, kra_id) => {
	const {
		is_rating_schema_in_percentage, is_target_achieved_manually, is_target_entered_manually,
	} = values;

	const ratings = [...Array(LENGTH_OF_ARRAY).keys()].map((key) => ({
		rating_scale : key + INCREMENTAL_ELEMENT,
		rating_value : values[`rating_${key + INCREMENTAL_ELEMENT}`],
	}));

	return {
		...values,
		is_rating_schema_in_percentage : is_rating_schema_in_percentage === 'yes',
		is_target_achieved_manually    : is_target_achieved_manually === 'yes',
		is_target_entered_manually     : is_target_entered_manually === 'yes',
		ratings,
		...(kra_id ? { kra_id } : {}),

	};
};

const useCreateKRA = () => {
	const router = useRouter();

	const kra_id = router?.query?.kra_id;

	const [showSelectedValue, setShowSelectedValue] = useState({});

	const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm();

	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'post',
			url    : kra_id ? '/edit_kra' : '/create_kra',
		},
		{ manual: true },
	);

	const onClickSubmitButton = async (values) => {
		const payload = getPayload(values, kra_id);

		try {
			await trigger({
				data: payload,
			});

			Toast.success('KRA created successfully');
			router.back();
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	};

	return {
		control,
		errors,
		handleSubmit,
		onClickSubmitButton,
		loading,
		watch,
		setValue,
		showSelectedValue,
		setShowSelectedValue,
	};
};

export default useCreateKRA;
