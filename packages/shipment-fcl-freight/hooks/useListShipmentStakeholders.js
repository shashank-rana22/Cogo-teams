import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListStakeholders = ({ defaultParams = {}, shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest('fcl_freight/list_stakeholders', { manual: true });

	const apiTrigger = useCallback(() => {
		(
			async () => {
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
			}
		)();
	}, [shipment_id, defaultParams, trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data: apiData,
		filters,
		apiTrigger,
		setFilters,
	};
};

export default useListStakeholders;
// TODO
