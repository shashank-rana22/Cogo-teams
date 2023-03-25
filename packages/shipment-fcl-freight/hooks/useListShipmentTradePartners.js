import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListShipmentTradePartners = ({ shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest('list_shipment_trade_partners', { manual: true });

	const { designation, origin_location_id } = filters;

	const apiTrigger = useCallback(() => {
		(
			async () => {
				try {
					const res = await trigger({
						params: {
							filters: {
								shipment_id,
							},
							poc_filters: {
								work_scopes : designation || undefined,
								location_id : origin_location_id || undefined,
							},
						},
					});

					setApiData(res.data || {});
				} catch (err) {
					setApiData({});
					console.log(err);
				}
			}
		)();
	}, [shipment_id, designation, origin_location_id, trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		setFilters,
		filters,
		data: apiData,
		apiTrigger,
	};
};

export default useListShipmentTradePartners;
// TODO
