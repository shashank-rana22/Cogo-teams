import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ shipmentId }) => ({
	filters: {
		shipment_id      : shipmentId,
		trade_party_type : ['destination_cha', 'origin_cha'],
	},
	page_limit: 1000,
});

function useListShipmentTradePartners({ shipmentId }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_trade_partners',
		method : 'get',
	}, { manual: true });

	const getShipmentTradePartnersList = useCallback(
		() => {
			try {
				trigger({
					params: getParams({ shipmentId }),
				});
			} catch (error) {
				console.error(error);
			}
		},
		[shipmentId, trigger],
	);

	useEffect(
		() => {
			getShipmentTradePartnersList();
		},
		[getShipmentTradePartnersList],
	);

	return {
		tradePartnersLoading : loading,
		tradePartnersData    : data?.external_poc_details?.poc_data,
	};
}

export default useListShipmentTradePartners;
