import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetTradePartners = ({ shipment_id = '', show = false }) => {
	const { loading, data, trigger } = useRequest(
		'get',
		false,
	)('/list_shipment_trade_partners');

	const getShipper = async () => {
		await trigger({
			params: {
				filters: {
					shipment_id,
					trade_party_type: 'shipper',
				},
				add_service_objects_required : true,
				page_limit                   : 20,
			},
		});
	};

	useEffect(() => {
		if (show) {
			getShipper();
		}
	}, [show]);

	return {
		loading,
		data,
		getShipper,
	};
};

export default useGetTradePartners;
