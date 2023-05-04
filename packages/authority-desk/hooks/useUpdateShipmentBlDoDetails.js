import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const updateApi = {
	export : 'update_shipment_bl_details',
	import : 'update_shipment_do_details',
};

const useUpdateShipmentBlDoDetails = ({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
	trade_type = 'export',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : `fcl_freight/${updateApi[trade_type]}`,
		method : 'POST',
	});

	const onUpdate = async (val) => {
		try {
			await trigger({ data: val });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading, onUpdate,
	};
};

export default useUpdateShipmentBlDoDetails;
