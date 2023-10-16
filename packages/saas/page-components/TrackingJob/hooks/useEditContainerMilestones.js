import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utlis/toastApiError';

const useEditContainerMilestones = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_container_timeline_detail',
	}, { manual: true });

	const updateMilestoneData = async ({ id, values }) => {
		try {
			await trigger({
				data: {
					saas_container_timeline_detail_id : id,
					data                              : values,
				},
			});
			refetch();
			Toast.success('MileStone Updated Sucessfully!');
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger: updateMilestoneData,
	};
};

export default useEditContainerMilestones;
