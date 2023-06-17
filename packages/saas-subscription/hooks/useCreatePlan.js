import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreatePlan = ({ closeModal }) => {
	const profile = useSelector((state) => state.profile || {});

	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/create_saas_custom_subscription',
		},
		{ manual: false },
	);
	const createPlan = async (obj) => {
		const { display_name = '', frequencyPeriod = '' } = obj || {};

		const plan_name = display_name.toLowerCase().replace(/\s/g, '-');
		try {
			await trigger({
				data: {
					...obj,
					plan_name,
					performed_by_id  : profile?.id,
					frequency_period : frequencyPeriod,
				},
			});
			closeModal(false);
			Toast.success('Plan Successfully Created');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return { createPlan, loading };
};

export default useCreatePlan;
