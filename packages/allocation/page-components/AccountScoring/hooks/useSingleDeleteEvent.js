import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';

function useSingleDeleteEvent(index, remove = () => {}) {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'remove_event_configuration',
		method  : 'POST',
		authkey : 'post_allocation_remove_event_configuration',
	}, { manual: true });

	const onSingleDelete = async (engagementType, eventName) => {
		try {
			const payload = {
				event_type : engagementType,
				event_name : eventName,
			};
			await trigger({ data: payload });
			remove(index, 1);

			Toast.success('deleted successfully');
		} catch (error) {
			Toast.error(error.message);
		}
	};

	return { onSingleDelete, singleDeleteLoading: loading };
}

export default useSingleDeleteEvent;
