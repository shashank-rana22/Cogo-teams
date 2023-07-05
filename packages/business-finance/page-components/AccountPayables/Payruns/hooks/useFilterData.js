import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useEffect, useState } from 'react';

import { advPaymentPayrunHistoryConfig } from '../columns/advPaymentPayrunHistoryConfig';
import { initiatedConfig } from '../columns/initiatedConfig';
import { initiatedListViewConfig } from '../columns/initiatedListViewConfig';
import { payrunHistoryConfig } from '../columns/payrunHistoryConfig';
import { payrunHistoryInvoiceConfig } from '../columns/payrunHistoryInvoiceConfig';
import { payrunPaidConfig } from '../columns/payrunPaidConfig';
import { uploadHistoryConfig } from '../columns/uploadHistoryConfig';

import useGetAdvPaymentInvoiceList from './useGetAdvPaymentInvoiceList';
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
	const {
		getAdvancePaymentInvoiceList,
		advancePaymentInvoiceList,
		advancePaymentInvoiceLoading,
	} = useGetAdvPaymentInvoiceList({ globalFilters, activePayrunTab });
	let config = {};
	let data = {};
	let loading = false;

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		if (['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab)) {
			if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
				getAdvancePaymentInvoiceList();
			} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
				getPayrunListView();
			}
		} else if (activePayrunTab === 'PAID') {
			getPaidList();
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			getUploadHistoryList();
		} else {
			getPayrunList();
		}
	}, [activePayrunTab, getAdvancePaymentInvoiceList,
		getPaidList, getPayrunList, getPayrunListView, getUploadHistoryList, isInvoiceView, overseasData]);

	if (['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab)) {
		if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
			data = advancePaymentInvoiceList;
			loading = advancePaymentInvoiceLoading;
			config = advPaymentPayrunHistoryConfig;
		}
	}
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
	} else if (activePayrunTab === 'COMPLETED') {
		config = payrunHistoryConfig;
		data = payrunData;
		loading = payrunLoading;
	} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
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
