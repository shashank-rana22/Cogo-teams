import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetShipmentOperatingProcedure = ({
	shipment_id = '7da5d7dc-7526-49e7-8ebb-11607e3654ae',
	organization_id = 'e0c1ce39-299a-44c4-b5e8-03c25bde387e',
}) => {
	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState(false);

	const [{ loading:apiLoading }, trigger] = useRequest('get_shipment_operating_procedure', { manual: true });

	const apiTrigger = async (restParams) => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_id,
						mode       : 'ocean',
						shipment_id,
						trade_type : 'import',
						...filters,
					},
					org_data_required: false,
					...restParams,
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
