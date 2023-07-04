import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useEffect, useState } from 'react';

import { initiatedConfig } from '../columns/initiatedConfig';
import { initiatedListViewConfig } from '../columns/initiatedListViewConfig';
import { payrunHistoryInvoiceConfig } from '../columns/payrunHistoryInvoiceConfig';
import { payrunPaidConfig } from '../columns/payrunPaidConfig';
import { uploadHistoryConfig } from '../columns/uploadHistoryConfig';

import useGetPaidList from './useGetPaidList';
import useGetPayrun from './useGetPayrun';
import useGetPayrunBillListView from './useGetPayrunBillListView';
import useGetUploadHistoryList from './useGetUploadHistoryList';

const useFilterData = ({ isInvoiceView, activePayrunTab, overseasData }) => {
	const [globalFilters, setGlobalFilters] = useState({
		search    : undefined,
		pageIndex : 1,
	});
	const { search, pageIndex } = globalFilters || {};
	const { query = '', debounceQuery } = useDebounceQuery();
	const { payrunData, payrunLoading, payrunStats, getPayrunList } = useGetPayrun({
		activePayrunTab,
		overseasData,
		query,
		pageIndex,
	});
	const { getPayrunListView, billListViewData, billListViewLoading } = useGetPayrunBillListView({ activePayrunTab });
	const { getUploadHistoryList, uploadHistoryListLoading, uploadHistoryDataList } = useGetUploadHistoryList();
	const { paidDataList, paidDataLoading, getPaidList } = useGetPaidList({ activePayrunTab });
	let config = {};
	let data = {};
	let loading = false;

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		if (activePayrunTab === 'PAID') {
			getPaidList();
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			getUploadHistoryList();
		} else if (isInvoiceView) {
			getPayrunListView();
		} else {
			getPayrunList();
		}
	}, [activePayrunTab, getPaidList, getPayrunList, getPayrunListView, getUploadHistoryList, isInvoiceView]);
	if (activePayrunTab === 'PAID') {
		data = paidDataList;
		loading = paidDataLoading;
		config = payrunPaidConfig;
	} else if (activePayrunTab === 'UPLOAD_HISTORY') {
		data = uploadHistoryDataList;
		loading = uploadHistoryListLoading;
		config = uploadHistoryConfig;
	} else if (activePayrunTab === 'COMPLETED' && isInvoiceView) {
		config = payrunHistoryInvoiceConfig;
		loading = billListViewLoading;
		data = billListViewData;
	} else if (isInvoiceView) {
		data = billListViewData;
		loading = billListViewLoading;
		config = initiatedListViewConfig;
	} else {
		data = payrunData;
		loading = payrunLoading;
		config = initiatedConfig;
	}

	return {
		data,
		loading,
		payrunStats,
		config,
		globalFilters,
		setGlobalFilters,
	};
};

export default useFilterData;
