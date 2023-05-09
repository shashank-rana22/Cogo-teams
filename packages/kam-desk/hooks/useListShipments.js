import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback, useContext } from 'react';

import KamDeskContext from '../context/KamDeskContext';
import getKamDeskFilters from '../helpers/getKamDeskFilters';

const useListShipments = () => {
	const [apiData, setApiData] = useState({
		data  : {},
		error : {},
	});

	const kamDeskContextValues = useContext(KamDeskContext);
	const { activeTab, filters } = kamDeskContextValues || {};
	const { page = 1 } = filters || {};

	const { finalFilters } = getKamDeskFilters({ filters, kamDeskContextValues });
	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipments',
		method : 'GET',
		params : {
			filters: finalFilters,
			page,
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();

				// if (res?.data?.list === 0 && page > 1) setFilters((prev) => ({ ...prev, page: 1 }));

				setApiData(res?.data || {});
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

export default useListShipments;
