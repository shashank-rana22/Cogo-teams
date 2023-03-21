import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipmentAudits = ({ defaultFilters = {} }) => {
	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});

	const [{ loading:apiLoading }, trigger] = useRequest('list_shipment_audits', { manual: true });

	const { page = 1, ...restFilters } = filters;

	const apiTrigger = async () => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters: {
						...defaultFilters,
						...restFilters,
					},
					page,

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
	}, [filters]);

	useEffect(() => {
		apiTrigger();
	}, []);

	return {
		apiTrigger,
		setFilters,
		loading : apiLoading || loading,
		data    : apiData,
	};
};

export default useListShipmentAudits;
