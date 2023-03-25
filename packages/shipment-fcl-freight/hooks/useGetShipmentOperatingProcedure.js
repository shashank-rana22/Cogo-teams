import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetShipmentOperatingProcedure = ({
	shipment_id,
	organization_id,
	defaultParams = {},
	defaultFilters = {},
}) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest('get_shipment_operating_procedure', { manual: true });

	const apiTrigger = async () => {
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

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			console.log({ err });
		}
	};

	useEffect(() => {
		apiTrigger();
	}, []);

	return {
		loading,
		data    : apiData,
		filters,
		setFilters,
		apiTrigger,
	};
};
export default useGetShipmentOperatingProcedure;
// TODO
