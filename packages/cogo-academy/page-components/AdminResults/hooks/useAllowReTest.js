import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useAllowReTest({ setShowRetestModal = () => {}, test_id, refetchTest = () => {} }) {
	const {
		control, formState: { errors }, watch, setValue, handleSubmit, reset,
	} = useForm();

	const [{ loading = false }, trigger] = useRequest({
		method : 'post',
		url    : 're_allow_test',
	}, { manual: true });

	const onSubmit = async (values) => {
		if (values?.users_list === 'custom') {
			try {
				await trigger({
					data: {
						test_id,
						users_list: 'custom',
						percentile:
						values?.filtered_users.includes('percentile_checked') ? Number(values?.percentile) : undefined,
						percentage:
						values?.filtered_users.includes('percentage_checked') ? Number(values?.percentage) : undefined,
						validity_start         : values?.test_validity?.startDate,
						validity_end           : values?.test_validity?.endDate,
						is_percentile_editable : values?.is_percentile_editable === 'true',
						not_appeared_included  : values?.filtered_users.includes('not_appeared'),
					},

				});
			} catch (err) {
				Toast.error(getApiErrorString(err.response?.data));
			}
			refetchTest({ test_id });
			setShowRetestModal(false);
			reset();
		} else {
			try {
				await trigger({
					data: {
						test_id,
						users_list             : 'all',
						validity_start         : values?.test_validity?.startDate,
						validity_end           : values?.test_validity?.endDate,
						is_percentile_editable : values?.is_percentile_editable === 'true',
					},
				});
			} catch (err) {
				Toast.error(getApiErrorString(err.response?.data));
			}
			refetchTest({ test_id });
			setShowRetestModal(false);
			reset();
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
