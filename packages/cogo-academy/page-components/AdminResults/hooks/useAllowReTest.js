import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useAllowReTest({ setShowRetestModal = () => {}, test_id, refetchTest = () => {} }) {
	const {
		control,
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
		reset,
	} = useForm();

	const [{ loading = false }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/re_allow_test',
		},
		{ manual: true },
	);

	const getPayload = (values) => {
		const payload = {
			test_id,
			validity_start         : values?.test_validity?.startDate,
			validity_end           : values?.test_validity?.endDate,
			is_percentile_editable : values?.is_percentile_editable === 'true',
		};

		if (values?.users_list === 'custom') {
			payload.users_list = 'custom';
			payload.percentile = values?.filtered_users.includes('percentile_checked') ? Number(values?.percentile)
				: undefined;
			payload.percentage = values?.filtered_users.includes('percentage_checked') ? Number(values?.percentage)
				: undefined;
			payload.not_appeared_included = values?.filtered_users.includes('not_appeared');
		} else {
			payload.users_list = 'all';
		}

		return payload;
	};

	const onSubmit = async (values) => {
		try {
			const payload = getPayload(values);
			await trigger({ data: payload });
			refetchTest({ test_id });
			setShowRetestModal(false);
			reset();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		watch,
		control,
		setValue,
		onSubmit,
		errors,
		handleSubmit,
		loading,
	};
}

export default useAllowReTest;
