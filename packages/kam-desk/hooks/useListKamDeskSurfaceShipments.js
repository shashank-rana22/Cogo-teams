import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback, useContext } from 'react';

import KamDeskContext from '../context/KamDeskContext';
import getKamDeskFilters from '../helpers/getKamDeskFilters';

const useListKamDeskSurfaceShipments = () => {
	const [apiData, setApiData] = useState({
		data  : {},
		error : {},
	});

	const kamDeskContextValues = useContext(KamDeskContext);
	const { activeTab, filters, stepperTab } = kamDeskContextValues || {};
	const { page = 1 } = filters || {};

	const { finalFilters } = getKamDeskFilters({ filters, kamDeskContextValues });
	const [{ loading }, trigger] = useRequest({
		url    : 'list_kam_desk_surface_shipments',
		method : 'GET',
		params : {
			filters       : finalFilters,
			shipment_type : stepperTab,
			page,
			page_limit    : 10,
			sort_by       : 'serial_id',
			sort_type     : 'desc',
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();

				// if (res?.data?.list === 0 && page > 1) setFilters((prev) => ({ ...prev, page: 1 }));

				setApiData((prev) => ({ ...prev, data: res?.data || {}, error: {} }));
			} catch (err) {
				console.log({ err });
				setApiData((prev) => ({ ...prev, data: {}, error: err }));
				Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
			}
		})();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();

		localStorage.setItem('kam_desk_values', JSON.stringify({
			filters,
			activeTab,
		}));
	}, [apiTrigger, activeTab, filters]);

	return {
		loading,
		data: apiData,
		apiTrigger,
	};
};

export default useListKamDeskSurfaceShipments;
