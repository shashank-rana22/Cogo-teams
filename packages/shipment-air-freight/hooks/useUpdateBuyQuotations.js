import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentBuyQuotations = ({
	refetch = () => {},
	getShipmentRefetch = () => {},
	successMessage = 'Updated Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_buy_quotations',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });
			Toast.success(successMessage);
			refetch();
			getShipmentRefetch();
			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading, apiTrigger,
	};
};

export default useUpdateShipmentBuyQuotations;
