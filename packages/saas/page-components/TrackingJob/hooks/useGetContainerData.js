import { Toast } from '@cogoport/components';
// import { getApiErrorString } from '@cogoport/front/utils';
import { useRequest } from '@cogoport/request';

import getOceanFormatterValues from '../helpers/getOceanFormattedValue';

const useGetContainerData = ({ reset, refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_container_and_bl_milestones',
	});
	const apiTrigger = async ({ values = {}, showUpdate }) => {
		try {
			console.log(values);
			const formatPayload = getOceanFormatterValues(values);
			await trigger({
				data: {
					...formatPayload,
					saas_container_subscription_id:
						showUpdate.data.saas_container_subscription_id,
					search_type: showUpdate.data.search_type,
				},
			});
			reset();
			refetch();
			Toast.success('Tracking Data Added Successfully');
		} catch (err) {
			console.log(err);
		}
	};
	return {
		apiTrigger,
		loading,
	};
};

export default useGetContainerData;
