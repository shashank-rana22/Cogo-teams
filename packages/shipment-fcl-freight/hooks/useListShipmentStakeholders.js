import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListStakeholders = ({ defaultParams = {}, shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});

	const [{ loading:apiLoading }, trigger] = useRequest('fcl_freight/list_stakeholders', { manual: true });

	const apiTrigger = async () => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters: {
						shipment_id,
					},
					...defaultParams,
				},
			});

			setLoading(false);
			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			setLoading(false);
			console.log(err);
		}
	};

	useEffect(() => {
		apiTrigger();
	}, []);

	return {
		loading : apiLoading || loading,
		data    : apiData,
		filters,
		apiTrigger,
		setFilters,
	};
};

export default useListStakeholders;
