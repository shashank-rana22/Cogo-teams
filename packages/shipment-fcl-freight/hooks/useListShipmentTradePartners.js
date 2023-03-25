import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipmentTradePartners = ({ shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});

	const [{ loading:apiLoading }, trigger] = useRequest('list_shipment_trade_partners', { manual: true });

	const { designation, origin_location_id } = filters;

	const apiTrigger = async () => {
		setLoading(true);

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

			setLoading(false);
			setApiData(res.data || {});
		} catch (err) {
			setLoading(false);
			setApiData({});
			console.log(err);
		}
	};

	useEffect(() => {
		apiTrigger();
	}, []);

	useEffect(() => {
		apiTrigger();
	}, [filters]);

	return {
		loading : apiLoading || loading,
		setFilters,
		filters,
		data    : apiData,
		apiTrigger,
	};
};

export default useListShipmentTradePartners;
// TODO
