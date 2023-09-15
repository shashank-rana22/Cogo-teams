import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState, useContext, useMemo } from 'react';

import CostBookingDeskContext from '../context/CostBookingDeskContext';

const INIT_PAGE = 1;

const APPROVED_STATUS = 'APPROVED';

const getParams = ({
	query = '',
	pagination = INIT_PAGE,
	extraFilters = {},
}) => {
	const searchQuery = query ? { q: query } : {};

	return {
		tradeType : 'import',
		type      : 'CONTAINER_SECURITY_DEPOSIT',
		pageIndex : pagination,
		pageSize  : 10,
		...searchQuery,
		...extraFilters,
	};
};

function useListPurchaseAdvanceDocument({ searchValue = '', modalData = {} }) {
	const {
		activeTab = '',
		paymentActiveTab = '',
		shipmentType = '',
		stepperTab = '',
		filters = {},
		newScopeFilters = {},
	} = useContext(CostBookingDeskContext);

	const { statusFilter } = modalData;

	const [pagination, setPagination] = useState(INIT_PAGE);

	const { query = '', debounceQuery } = useDebounceQuery();

	const extraFilters = paymentActiveTab === 'payment_request'
		? {
			status: !isEmpty(statusFilter)
				? [statusFilter] : undefined,
		} : {
			status     : APPROVED_STATUS,
			reconciled : !isEmpty(statusFilter)
				? statusFilter : undefined,
		};

	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/purchase/advance-document/list-csd-advance-documents',
		method  : 'GET',
		authKey : 'get_purchase_advance_document_list_csd_advance_documents',
		params  : getParams({ query, pagination, extraFilters, statusFilter, paymentActiveTab }),
	}, { manual: false });

	const documentListIds = useMemo(() => (data?.list || []).map((item) => item?.advanceDocumentId), [data?.list]);

	const apiTrigger = useCallback(() => {
		try {
			trigger();
		} catch (err) {
			Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
		}
	}, [trigger]);

	useEffect(() => {
		if (isEmpty(documentListIds) && pagination > INIT_PAGE) {
			setPagination(INIT_PAGE);
		}

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
	}, [activeTab, documentListIds, filters, newScopeFilters, pagination, paymentActiveTab, shipmentType, stepperTab]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	return {
		loading,
		data,
		apiTrigger,
		pagination,
		setPagination,
	};
}
export default useListPurchaseAdvanceDocument;
