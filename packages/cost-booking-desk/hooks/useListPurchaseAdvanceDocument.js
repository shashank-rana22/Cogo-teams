import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState, useContext } from 'react';

import CostBookingDeskContext from '../context/CostBookingDeskContext';

const INIT_PAGE = 1;

const getParams = ({ pagination = INIT_PAGE, extraFilters = {} }) => ({
	tradeType  : 'import',
	type       : 'CONTAINER_SECURITY_DEPOSIT',
	page       : pagination,
	page_limit : 10,
	...extraFilters,
});

function useListPurchaseAdvanceDocument(searchValue = '') {
	const {
		activeTab = '', paymentActiveTab = '', shipmentType = '',
		stepperTab = '', filters = {}, newScopeFilters = {},
	} = useContext(CostBookingDeskContext);

	const [pagination, setPagination] = useState(INIT_PAGE);
	const { query = '', debounceQuery } = useDebounceQuery();

	const extraFilters = paymentActiveTab === 'refunds_and_settlements' ? { status: 'APPROVED' } : {};

	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/purchase/advance-document/list-csd-advance-documents',
		method  : 'GET',
		authKey : 'get_purchase_advance_document_list_csd_advance_documents',
		params  : getParams({ query, pagination, extraFilters }),
	}, { manual: false });

	const apiTrigger = useCallback(() => {
		try {
			trigger();
			if (isEmpty(data?.list) && pagination > INIT_PAGE) {
				setPagination(INIT_PAGE);
			}
		} catch (err) {
			Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
		}
	}, [trigger, pagination, data]);

	useEffect(() => {
		// apiTrigger();
		localStorage.setItem(
			'cost_booking_desk_values',
			JSON.stringify({
				filters,
				activeTab,
				scopeFilters: newScopeFilters,
				stepperTab,
				shipmentType,
				paymentActiveTab,
			}),
		);
	}, [apiTrigger, paymentActiveTab, activeTab, shipmentType, stepperTab, filters, newScopeFilters]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	return {
		loading,
		data,
		pagination,
		setPagination,
	};
}
export default useListPurchaseAdvanceDocument;
