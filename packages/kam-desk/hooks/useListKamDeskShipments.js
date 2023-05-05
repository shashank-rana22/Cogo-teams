import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback, useContext } from 'react';

import KamDeskContext from '../context/KamDeskContext';
import getKamDeskFilters from '../helpers/getKamDeskFilters';

const useListKamDeskShipments = () => {
	const [apiData, setApiData] = useState({});

	const kamDeskContextValues = useContext(KamDeskContext);
	const { activeTab, filters, setFilters, stepperTab, shipmentType } = kamDeskContextValues || {};
	const { page = 1 } = filters || {};

	const { finalFilters, additionalMethods } = getKamDeskFilters({ filters, kamDeskContextValues });

	const apiPrefix = ['import', 'export'].includes(stepperTab) ? shipmentType : stepperTab;

	const [{ loading }, trigger] = useRequest({
		url    : `${apiPrefix}/list_kam_desk_shipments`,
		method : 'GET',
		params : {
			filters            : finalFilters,
			additional_methods : additionalMethods,
			page,
			page_limit         : 10,
			sort_by            : 'serial_id',
			sort_type          : 'desc',
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();

				if (res?.data?.list === 0 && page > 1) setFilters((prev) => ({ ...prev, page: 1 }));
				setApiData(res?.data || {});
			} catch (err) {
				console.log({ err });
				Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
			}
		})();
	}, [trigger, page, setFilters]);

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

export default useListKamDeskShipments;
