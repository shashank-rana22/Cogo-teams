import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const usePocServiceList = ({ shipment_id = '', defaultParams, defaultFilters }) => {
	const [apiData, setApiData] = useState({});
 	const [loading, setLoading] = useState(false);
 	const [filters, setFilters] = useState({});

 	const [{ loading:apiLoading }, trigger] = useRequest('list_shipment_services', { manual: true });

 	const { page = 1, ...restFilters } = filters;

 	const apiTrigger = async () => {
 		setLoading(true);
 		try {
 			const res = await trigger({
 				params: {
 					filters: {
 						shipment_id,
 						...defaultFilters,
 						...restFilters,
 					},
 					page,
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
 		loading : loading || apiLoading,
 		apiTrigger,
 		filters,
 		setFilters,
 		data    : apiData,
 	};
};
export default usePocServiceList;
