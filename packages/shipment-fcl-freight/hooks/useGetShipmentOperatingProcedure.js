import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetShipmentOperatingProcedure = ({
	shipment_id,
	organization_id,
	defaultParams = {},
	defaultFilters = {},
}) => {
	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});

	const [{ loading:apiLoading }, trigger] = useRequest('get_shipment_operating_procedure', { manual: true });

	const apiTrigger = async () => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_id,
						mode       : 'ocean',
						shipment_id,
						trade_type : 'import',
						...defaultFilters,
						...filters,
					},
					org_data_required: false,
					...defaultParams,
				},
			});

			setLoading(false);
			setApiData(res.data || {});
		} catch (err) {
			setLoading(false);
			setApiData({});
			console.log({ err });
		}
	};

	useEffect(() => {
		apiTrigger();
	}, []);

	return {
		loading : apiLoading || loading,
		data    : apiData,
		filters,
		setFilters,
		apiTrigger,
	};
};
export default useGetShipmentOperatingProcedure;
