import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListShipmentAudits = ({ defaultFilters = {} }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest('list_shipment_audits', { manual: true });

	const { page = 1, ...restFilters } = filters;

	const apiTrigger = async () => {
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

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			Toast.error(getApiErrorString(err));
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
		loading,
		data: apiData,
	};
};

export default useListShipmentAudits;
// TODO
