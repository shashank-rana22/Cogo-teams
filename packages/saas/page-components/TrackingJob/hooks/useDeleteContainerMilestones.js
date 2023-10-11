import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utlis/toastApiError';

const useDeleteContainerMilestones = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/delete_saas_container_timeline_detail',
	}, { manual: true });

	const deleteMileStones = async (id) => {
		try {
			await trigger({
				params: { saas_container_timeline_detail_id: id },
			});
			Toast.success('Deleted Sucessfully');
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		deleteMileStones,
		loading,
	};
};

export default useDeleteContainerMilestones;
