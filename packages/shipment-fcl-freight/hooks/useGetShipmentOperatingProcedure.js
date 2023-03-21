import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';
// e0c1ce39-299a-44c4-b5e8-03c25bde387e
// 8b46fcc0-085b-4b18-9302-52655f698ce5
const org_id = 'e0c1ce39-299a-44c4-b5e8-03c25bde387e';
// 7da5d7dc-7526-49e7-8ebb-11607e3654ae
// e50be905-5fd1-460b-82e5-548ece312be7
const ship_id = '7da5d7dc-7526-49e7-8ebb-11607e3654ae';

const useGetShipmentOperatingProcedure = ({
	shipment_id = ship_id,
	organization_id = org_id,
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
