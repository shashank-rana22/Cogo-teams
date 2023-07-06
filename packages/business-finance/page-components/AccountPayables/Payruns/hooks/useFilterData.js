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
	const [apiData, setApiData] = useState({
		listData    : {},
		dataLoading : false,
		listConfig  : initiatedConfig,
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

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		if (['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab)) {
			if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
				getAdvancePaymentInvoiceList();
			} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
				getPayrunListView();
			} else {
				getPayrunList();
			}
		} else if (activePayrunTab === 'PAID') {
			getPaidList();
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			getUploadHistoryList();
		}
	}, [activePayrunTab, overseasData, isInvoiceView, getAdvancePaymentInvoiceList, getPayrunListView,
		getPayrunList, getPaidList, getUploadHistoryList]);

	useEffect(() => {
		if (['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab)) {
			if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
				setApiData({
					listData    : advancePaymentInvoiceList,
					dataLoading : advancePaymentInvoiceLoading,
					listConfig  : advPaymentPayrunHistoryConfig,
				});
			} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
				setApiData({
					listData    : billListViewData,
					dataLoading : billListViewLoading,
					listConfig  : activePayrunTab === 'COMPLETED' ? payrunHistoryInvoiceConfig
						: initiatedListViewConfig,
				});
			} else {
				setApiData({
					listData    : payrunData,
					dataLoading : payrunLoading,
					listConfig  : activePayrunTab === 'COMPLETED' ? payrunHistoryConfig : initiatedConfig,
				});
			}
		} else if (activePayrunTab === 'PAID') {
			setApiData({
				listData    : paidDataList,
				dataLoading : paidDataLoading,
				listConfig  : payrunPaidConfig,
			});
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			setApiData({
				listData    : uploadHistoryDataList,
				dataLoading : uploadHistoryListLoading,
				listConfig  : uploadHistoryConfig,
			});
		}
	}, [activePayrunTab, advancePaymentInvoiceList,
		advancePaymentInvoiceLoading, billListViewData,
		billListViewLoading, payrunData, payrunLoading,
		paidDataList, paidDataLoading, uploadHistoryDataList, uploadHistoryListLoading, isInvoiceView, overseasData]);

	useEffect(() => {
		setOverseasData('NORMAL');
	}, [activePayrunTab, setOverseasData]);

	return {
		data    : apiData.listData,
		loading : apiData.dataLoading,
		payrunStats,
		config  : apiData.listConfig,
		globalFilters,
		setGlobalFilters,
	};
};

export default useFilterData;
