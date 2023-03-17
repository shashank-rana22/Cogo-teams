import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipmentStakeholders = ({ defaultParams = {} }) => {
	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});

	const [{ loading:apiLoading }, trigger] = useRequest('list_shipment_stakeholders', { manual: true });

	const apiTrigger = async () => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters: {
						shipment_id: '6dce8912-7892-4ed3-9f1e-843726b55fab',
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

export default useListShipmentStakeholders;
