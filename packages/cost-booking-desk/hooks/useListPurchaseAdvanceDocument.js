import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState, useContext } from 'react';

import CostBookingDeskContext from '../context/CostBookingDeskContext';

const INIT_PAGE = 1;

function useListPurchaseAdvanceDocument(searchValue = '') {
	const contextValues = useContext(CostBookingDeskContext);

	const { activeTab, paymentType, shipmentType, stepperTab } = contextValues || {};

	const [apiData, setApiData] = useState('');
	const [pagination, setPagination] = useState(INIT_PAGE);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading }, trigger] = useRequest({
		url    : '/purchase/advance-document/list/v2',
		method : 'GET',
		params : {
			filters: {
				q: query,
			},
			tradeType  : 'import',
			type       : 'CONTAINER_SECURITY_DEPOSIT',
			page       : pagination,
			page_limit : 10,
		},
	}, { manual: false });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			if (isEmpty(res?.data?.list) && pagination > INIT_PAGE) {
				setPagination(INIT_PAGE);
			}
			setApiData(res?.data);
		} catch (err) {
			Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
		}
	}, [trigger, pagination]);

	useEffect(() => {
		apiTrigger();
		localStorage.setItem(
			'cost_booking_desk_values',
			JSON.stringify({ paymentType, activeTab, shipmentType, stepperTab }),
		);
	}, [apiTrigger, paymentType, activeTab, shipmentType, stepperTab]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	return {
		loading,
		data: apiData,
		pagination,
		setPagination,
	};
}
export default useListPurchaseAdvanceDocument;
