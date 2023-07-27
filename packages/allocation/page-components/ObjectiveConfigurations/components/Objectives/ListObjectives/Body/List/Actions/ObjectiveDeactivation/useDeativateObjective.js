import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useDeactivateObjective = (props) => {
	const { objectiveId, setShowActionModal } = props;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/objective_status',
		method  : 'POST',
		authkey : 'post_allocation_objective_status',
	}, { manual: true });

	const onDeactivation = async () => {
		try {
			const payload = { objective_id: objectiveId, status: 'inactive' };

			await trigger({ data: payload });

			setShowActionModal({});
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		onDeactivation,
	};
};

export default useDeactivateObjective;
