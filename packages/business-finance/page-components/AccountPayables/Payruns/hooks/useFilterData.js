import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useEffect, useState } from 'react';

import { advencePayrunPaidConfig } from '../columns/advancePaidPayrunConfig';
import { advPaymentPayrunHistoryConfig } from '../columns/advPaymentPayrunHistoryConfig';
import { initiatedConfig } from '../columns/initiatedConfig';
import { initiatedListViewConfig } from '../columns/initiatedListViewConfig';
import { payrunHistoryConfig } from '../columns/payrunHistoryConfig';
import { payrunHistoryInvoiceConfig } from '../columns/payrunHistoryInvoiceConfig';
import { payrunPaidConfig } from '../columns/payrunPaidConfig';
import { uploadHistoryConfig } from '../columns/uploadHistoryConfig';

import useGetAdvPaymentInvoiceList from './useGetAdvPaymentInvoiceList';
import useGetPaidAdvanceList from './useGetPaidAdvanceList';
import useGetPaidList from './useGetPaidList';
import useGetPayrun from './useGetPayrun';
import useGetPayrunBillListView from './useGetPayrunBillListView';
import useGetUploadHistoryList from './useGetUploadHistoryList';

const useFilterData = ({
	isInvoiceView, activePayrunTab, overseasData,
	setOverseasData, setViewId, setActiveAdvPaid,
}) => {
	const [globalFilters, setGlobalFilters] = useState({
		search    : undefined,
		pageIndex : 1,
		pageSize  : 10,
	});

	const [sort, setSort] = useState({});
	const [apiData, setApiData] = useState({
		listData    : {},
		dataLoading : false,
		listConfig  : initiatedConfig,
	});
	// const [payrunId, setPayrunId] = useState(null);

	const { search, pageIndex, createdAt } = globalFilters || {};
	const { query = '', debounceQuery } = useDebounceQuery();
	const { payrunData, payrunLoading, payrunStats, getPayrunList } = useGetPayrun({
		activePayrunTab,
		overseasData,
		query,
		pageIndex,
	});

	const {
		getPayrunListView, billListViewData,
		billListViewLoading,
	} = useGetPayrunBillListView({ activePayrunTab, sort, query, globalFilters });
	const {
		getUploadHistoryList, uploadHistoryListLoading,
		uploadHistoryDataList,
	} = useGetUploadHistoryList({ sort, query, globalFilters });
	const { paidDataList, paidDataLoading, getPaidList } = useGetPaidList({ activePayrunTab, query, globalFilters });
	const {
		getAdvancePaymentInvoiceList,
		advancePaymentInvoiceList,
		advancePaymentInvoiceLoading,
	} = useGetAdvPaymentInvoiceList({ globalFilters, activePayrunTab });
	const {
		getAdvancePaidData,
		paidAdvanceListData,
		paidAdvanceListLoading,
	} = useGetPaidAdvanceList({ activePayrunTab, query });
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
			if (overseasData === 'NORMAL') {
				getPaidList();
			} else if (overseasData === 'ADVANCE_PAYMENT') {
				getAdvancePaidData();
			}
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			getUploadHistoryList();
		}
	}, [activePayrunTab, overseasData, isInvoiceView,
		getAdvancePaymentInvoiceList, getPayrunListView, getPayrunList, getPaidList,
		getUploadHistoryList, createdAt, getAdvancePaidData]);

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
			if (overseasData === 'NORMAL') {
				setApiData({
					listData    : paidDataList,
					dataLoading : paidDataLoading,
					listConfig  : payrunPaidConfig,
				});
			} else if (overseasData === 'ADVANCE_PAYMENT') {
				setApiData({
					listData    : paidAdvanceListData,
					dataLoading : paidAdvanceListLoading,
					listConfig  : advencePayrunPaidConfig,
				});
			}
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			setApiData({
				listData    : uploadHistoryDataList,
				dataLoading : uploadHistoryListLoading,
				listConfig  : uploadHistoryConfig,
			});
		}
	}, [activePayrunTab, advancePaymentInvoiceList, advancePaymentInvoiceLoading,
		billListViewData, billListViewLoading, payrunData, payrunLoading, paidDataList,
		paidDataLoading, uploadHistoryDataList, uploadHistoryListLoading, isInvoiceView, overseasData,
		paidAdvanceListData, paidAdvanceListLoading]);

	useEffect(() => {
		setOverseasData('NORMAL');
		setViewId('');
		setActiveAdvPaid('');
	}, [activePayrunTab, setActiveAdvPaid, setOverseasData, setViewId]);

	return {
		data    : apiData.listData,
		loading : apiData.dataLoading,
		payrunStats,
		config  : apiData.listConfig,
		globalFilters,
		setGlobalFilters,
		sort,
		setSort,
	};
};

export default useFilterData;
