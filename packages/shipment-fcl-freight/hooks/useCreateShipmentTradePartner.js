import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateShipmentTradePartner = ({
	shipment_id = '',
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [loading, setLoading] = useState(false);

	const [{ loading:apiLoading }, trigger] = useRequest({
		url    : '/create_shipment_trade_partner',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		setLoading(true);
		try {
			const res = await trigger({ params: { ...val, shipment_id } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
			console.log({ err });
		}
	};

	return {
		apiTrigger,
		loading: apiLoading || loading,
	};
};

export default useCreateShipmentTradePartner;
