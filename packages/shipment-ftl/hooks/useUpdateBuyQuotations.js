import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentBuyQuotations = ({
	refetch = () => {},
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
