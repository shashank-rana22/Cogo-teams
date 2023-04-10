import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

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
				const res = await trigger({ data: { update_data } });

				if (res.status === 200) {
					Toast.success('Container Details Updated Successfully!');
					refetch();
				} else {
					Toast.error('Please check the details filled or try again!');
				}
			} catch (err) {
				Toast.error(getApiErrorString(err));
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
