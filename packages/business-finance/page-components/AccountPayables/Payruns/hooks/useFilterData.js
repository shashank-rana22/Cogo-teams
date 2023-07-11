import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { advencePayrunPaidConfig } from '../columns/advancePaidPayrunConfig';
import { advPaymentPayrunHistoryConfig } from '../columns/advPaymentPayrunHistoryConfig';
import { initiatedConfig } from '../columns/initiatedConfig';
import { initiatedListViewConfig } from '../columns/initiatedListViewConfig';
import { PAYMENT_INITIATED_PAYRUN } from '../columns/paymentInitiatedPayrunConfig';
import { payrunHistoryConfig } from '../columns/payrunHistoryConfig';
import { payrunHistoryInvoiceConfig } from '../columns/payrunHistoryInvoiceConfig';
import { payrunPaidConfig } from '../columns/payrunPaidConfig';
import { uploadHistoryConfig } from '../columns/uploadHistoryConfig';
import { VIEW_INVOICE_NORMAL_CONFIG } from '../columns/viewInvoiceForSelected';
import { ADVANCE_PAYMENT_VIEW_INVOICE } from '../columns/viewInvoiceForSelectedAdvance';

import useGetAdvancePaymentView from './useGetAdvancePaymentView';
import useGetAdvPaymentInvoiceList from './useGetAdvPaymentInvoiceList';
import useGetPaidAdvanceList from './useGetPaidAdvanceList';
import useGetPaidList from './useGetPaidList';
import useGetPayrun from './useGetPayrun';
import useGetPayrunBillListView from './useGetPayrunBillListView';
import useGetUploadHistoryList from './useGetUploadHistoryList';
import useGetViewInvoices from './useGetViewInvoices';

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

	const [selectedPayrun, setSelectedPayrun] = useState(null);

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
	const {
		getViewInvoice,
		viewInvoiceDataList,
		viewInvoiceDataLoading,
	} = useGetViewInvoices({ globalFilters, selectedPayrun, query });
	const {
		getViewInvoicesAdvancePayment, viewInvoicesAdvancePaymentData,
		viewInvoicesAdvancePaymentLoading,
	} = useGetAdvancePaymentView({ globalFilters, selectedPayrun, query });
	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		if (['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab)) {
			if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
				getAdvancePaymentInvoiceList();
			} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
				getPayrunListView();
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData !== 'ADVANCE_PAYMENT')) {
				getViewInvoice();
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData === 'ADVANCE_PAYMENT')) {
				getViewInvoicesAdvancePayment();
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
	}, [activePayrunTab, overseasData, isInvoiceView, getViewInvoice, getAdvancePaymentInvoiceList, getPayrunListView,
		getPayrunList, getPaidList, getUploadHistoryList, createdAt, getAdvancePaidData, selectedPayrun,
		getViewInvoicesAdvancePayment]);

	useEffect(() => {
		let filteredConfig = {};
		if (activePayrunTab === 'PAYMENT_INITIATED' && !isInvoiceView) {
			filteredConfig = PAYMENT_INITIATED_PAYRUN;
		} else if (activePayrunTab === 'COMPLETED' && !isInvoiceView) {
			filteredConfig = payrunHistoryConfig;
		} else {
			filteredConfig = initiatedConfig;
		}
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
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData !== 'ADVANCE_PAYMENT')) {
				setApiData({
					listData    : viewInvoiceDataList,
					dataLoading : viewInvoiceDataLoading,
					listConfig  : VIEW_INVOICE_NORMAL_CONFIG,
				});
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData === 'ADVANCE_PAYMENT')) {
				setApiData({
					listData    : viewInvoicesAdvancePaymentData,
					dataLoading : viewInvoicesAdvancePaymentLoading,
					listConfig  : ADVANCE_PAYMENT_VIEW_INVOICE,
				});
			} else {
				setApiData({
					listData    : payrunData,
					dataLoading : payrunLoading,
					listConfig  : filteredConfig,
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
	}, [activePayrunTab, advancePaymentInvoiceList, advancePaymentInvoiceLoading, billListViewData, billListViewLoading,
		payrunData, payrunLoading, paidDataList, paidDataLoading, uploadHistoryDataList, uploadHistoryListLoading,
		isInvoiceView, overseasData, paidAdvanceListData, paidAdvanceListLoading, selectedPayrun, viewInvoiceDataList,
		viewInvoiceDataLoading, viewInvoicesAdvancePaymentData, viewInvoicesAdvancePaymentLoading]);

	useEffect(() => {
		setOverseasData('NORMAL');
		setViewId('');
		setActiveAdvPaid('');
		setSelectedPayrun(null);
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
		setSelectedPayrun,
		selectedPayrun,
	};
};

export default useFilterData;
