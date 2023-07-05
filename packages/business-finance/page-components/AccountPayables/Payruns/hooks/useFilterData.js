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

const useFilterData = ({ isInvoiceView, activePayrunTab, overseasData, setOverseasData }) => {
	const [globalFilters, setGlobalFilters] = useState({
		search    : undefined,
		pageIndex : 1,
	});
	const [apiData, setApiData] = useState({ listData: {}, dataLoading: false, listConfig: {} });
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
	// const config = {};
	// const data = {};
	// const loading = false;

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		if (['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab)) {
			if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
				getAdvancePaymentInvoiceList();
				setApiData({
					...apiData,
					listData    : advancePaymentInvoiceList,
					dataLoading : advancePaymentInvoiceLoading,
					listConfig  : advPaymentPayrunHistoryConfig,
				});
			} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
				getPayrunListView();
				setApiData({
					...apiData,
					listData    : billListViewData,
					dataLoading : billListViewLoading,
					listConfig  : activePayrunTab === 'COMPLETED' ? payrunHistoryInvoiceConfig
						: initiatedListViewConfig,
				});
			} else {
				getPayrunList();
				setApiData({
					...apiData,
					listData    : payrunData,
					dataLoading : payrunLoading,
					listConfig  : activePayrunTab === 'COMPLETED' ? payrunHistoryConfig : initiatedConfig,
				});
			}
		} else if (activePayrunTab === 'PAID') {
			getPaidList();
			setApiData({
				...apiData,
				listData    : paidDataList,
				dataLoading : paidDataLoading,
				listConfig  : payrunPaidConfig,
			});
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			getUploadHistoryList();
			setApiData({
				...apiData,
				listData    : uploadHistoryDataList,
				dataLoading : uploadHistoryListLoading,
				listConfig  : uploadHistoryConfig,
			});
		}
	}, [activePayrunTab, advancePaymentInvoiceList, advancePaymentInvoiceLoading, apiData,
		billListViewData, billListViewLoading, getAdvancePaymentInvoiceList, getPaidList,
		getPayrunList, getPayrunListView, getUploadHistoryList, isInvoiceView, overseasData, paidDataList,
		paidDataLoading, payrunData, payrunLoading, uploadHistoryDataList, uploadHistoryListLoading]);

	// if (['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab)) {
	// 	if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
	// 		data = advancePaymentInvoiceList;
	// 		loading = advancePaymentInvoiceLoading;
	// 		config = advPaymentPayrunHistoryConfig;
	// 	}
	// }
	// if (activePayrunTab === 'PAID') {
	// 	data = paidDataList;
	// 	loading = paidDataLoading;
	// 	config = payrunPaidConfig;
	// } else if (activePayrunTab === 'UPLOAD_HISTORY') {
	// 	data = uploadHistoryDataList;
	// 	loading = uploadHistoryListLoading;
	// 	config = uploadHistoryConfig;
	// } else if (activePayrunTab === 'COMPLETED' && isInvoiceView) {
	// 	config = payrunHistoryInvoiceConfig;
	// 	loading = billListViewLoading;
	// 	data = billListViewData;
	// } else if (activePayrunTab === 'COMPLETED') {
	// 	config = payrunHistoryConfig;
	// 	data = payrunData;
	// 	loading = payrunLoading;
	// } else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
	// 	data = billListViewData;
	// 	loading = billListViewLoading;
	// 	config = initiatedListViewConfig;
	// } else {
	// 	data = payrunData;
	// 	loading = payrunLoading;
	// 	config = initiatedConfig;
	// }
	useEffect(() => {
		// setViewId('');
		// setActiveAdvPaid('NORMAL');
		setOverseasData('NORMAL');
	}, [activePayrunTab, setOverseasData]);

	return {
		data    : apiData.listData,
		// data,
		loading : apiData.dataLoading,
		payrunStats,
		config  : apiData.listConfig,
		globalFilters,
		setGlobalFilters,
	};
};

export default useFilterData;
