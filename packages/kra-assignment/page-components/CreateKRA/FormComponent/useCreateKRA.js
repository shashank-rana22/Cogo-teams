import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const LENGTH_OF_ARRAY = 5;
const INCREMENTAL_ELEMENT = 1;

const getPayload = (values) => {
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

	};
};

const useCreateKRA = () => {
	const { control, handleSubmit, formState: { errors }, watch } = useForm();

	const [{ loading }, trigger] = useHarbourRequest(
		{
			method : 'post',
			url    : '/create_kra',
		},
		{ manual: true },
	);

	const onClickSubmitButton = async (values) => {
		const payload = getPayload(values);
		try {
			await trigger({
				data: payload,
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	};

	return { control, errors, handleSubmit, onClickSubmitButton, loading, watch };
};

export default useCreateKRA;
