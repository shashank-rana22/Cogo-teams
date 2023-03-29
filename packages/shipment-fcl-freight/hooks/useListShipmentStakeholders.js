import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

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
					Toast.error(getApiErrorString(err));
				}
			}
		)();
	}, [shipment_id, JSON.stringify(defaultParams), trigger]);

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
