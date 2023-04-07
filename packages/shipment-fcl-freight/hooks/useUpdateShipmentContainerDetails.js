import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateShipmentContainerDetails = ({
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_container_details',
		method : 'POST',
	});

	const apiTrigger = async (update_data) => {
		if (update_data?.length !== 0) {
			try {
				await trigger({ data: { update_data } });

				Toast.success('Container Details Updated Successfully!');
				refetch();
			} catch (err) {
				Toast.error('Please check the details filled or try again!');
				toastApiError(err);
			}
		} else {
			Toast.error('Update Data cannot be blank');
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateShipmentContainerDetails;
