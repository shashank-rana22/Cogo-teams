import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getOceanFormatterValues from '../helpers/getOceanFormattedValue';
import toastApiError from '../utlis/toastApiError';

const useUpdateContainerAndBlMiles = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_container_and_bl_milestones',
	}, { manual: true });
	const apiTrigger = async ({ values = {}, showUpdate }) => {
		try {
			const formatPayload = getOceanFormatterValues(values);
			await trigger({
				data: {
					...formatPayload,
					saas_container_subscription_id:
						showUpdate.data.saas_container_subscription_id,
					search_type: showUpdate.data.search_type,
				},
			});
			refetch();
			Toast.success('Tracking Data Added Successfully');
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		apiTrigger,
		createLoading: loading,
	};
};

export default useUpdateContainerAndBlMiles;
