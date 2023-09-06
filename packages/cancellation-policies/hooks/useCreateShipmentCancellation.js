import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

// import getCreateUpdateCommodityPayload from '../helpers/getCreateUpdateCommodityPayload';
import toastApiError from '../utils/toastApiError';

const useCreateShipmentCancellation = ({
	successMessage = 'Created Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_cancellation_charge',
		method : 'POST',
	}, { manual: true });

	// val wil have formValues as values
	const apiTrigger = async (val) => {
		try {
			// const payload = getCreateUpdateCommodityPayload(val);
			const res = await trigger({ data: val });

			Toast.success(successMessage);

			refetch();

			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateShipmentCancellation;
