import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListStakeholders = ({ defaultParams = {}, shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest('fcl_freight/list_stakeholders', { manual: true });

	const apiTrigger = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						shipment_id,
					},
					...defaultParams,
				},
			});

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			console.log(err);
		}
	};

	useEffect(() => {
		apiTrigger();
	}, []);

	return {
		loading,
		data    : apiData,
		filters,
		apiTrigger,
		setFilters,
	};
};

export default useListStakeholders;
// TODO
