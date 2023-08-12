import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useDeleteObjectivesKAMList({
	objective_id = '',
	refetchListObjectives = () => { },
	handleCloseActionModal = () => { },
}) {
	const [{ loading = false }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_objective_status',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_objective_status',
	}, { manual: true });

	const handleDeleteKAMsList = async () => {
		try {
			const payload = {
				objective_id,
				status: 'inactive',
			};

			await trigger({
				data: payload,
			});

			refetchListObjectives();

			handleCloseActionModal();
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	return {
		handleDeleteKAMsList,
		loading,
	};
}

export default useDeleteObjectivesKAMList;
