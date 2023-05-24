import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdatePlanAddon = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_saas_product_plan_mapping',
		method : 'post',
	}, { manual: true });

	const updateAddonHandler = async () => {
		try {
			await trigger({
				data: {
					saas_plan_id : '',
					addons       : '',
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		updateAddonHandler,
		loading,
	};
};

export default useUpdatePlanAddon;
