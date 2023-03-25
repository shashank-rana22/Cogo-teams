import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateShipmentTradePartner = ({
	shipment_id = '',
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_trade_partner',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ params: { ...val, shipment_id } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			Toast.error(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useCreateShipmentTradePartner;
