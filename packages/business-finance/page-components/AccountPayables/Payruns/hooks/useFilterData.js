import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { ADVANCE_PAYMENT_PAYRUN_PAID_CONFIG } from '../columns/advancePaidPayrunConfig';
import { ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG } from '../columns/advPaymentPayrunHistoryConfig';
import { PAYRUN_AUDITED_PAYMENT_READY } from '../columns/initiatedConfig';
import { INITIATED_LIST_VIEW_CONFIG } from '../columns/initiatedListViewConfig';
import { PAYMENT_INITIATED_PAYRUN } from '../columns/paymentInitiatedPayrunConfig';
import { PAYRUN_HISTORY_CONFIG } from '../columns/payrunHistoryConfig';
import { PAYRUN_HISTORY_INVOICE_CONFIG } from '../columns/payrunHistoryInvoiceConfig';
import { PAYRUN_PAID_NORMAL_CONFIG } from '../columns/payrunPaidConfig';
import { UPLOAD_HISTORY_CONFIG } from '../columns/uploadHistoryConfig';
import { VIEW_INVOICE_NORMAL_CONFIG } from '../columns/viewInvoiceForSelected';
import { ADVANCE_PAYMENT_VIEW_INVOICE } from '../columns/viewInvoiceForSelectedAdvance';
import { VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG } from '../columns/viewInvoiceForSelectedAdvancePaymentReady';
import { VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG } from '../columns/viewInvoiceForSelectedPaymentReady';

import useGetAdvancePaymentView from './useGetAdvancePaymentView';
import useGetAdvPaymentInvoiceList from './useGetAdvPaymentInvoiceList';
import useGetPaidAdvanceList from './useGetPaidAdvanceList';
import useGetPaidList from './useGetPaidList';
import useGetPayrun from './useGetPayrun';
import useGetPayrunBillListView from './useGetPayrunBillListView';
import useGetUploadHistoryList from './useGetUploadHistoryList';
import useGetViewInvoices from './useGetViewInvoices';

const PAYRUN_INNER_TAB_NAME = ['INITIATED', 'AUDITED', 'PAYMENT_INITIATED', 'COMPLETED'];

const useFilterData = ({
	isInvoiceView,
	activePayrunTab,
	overseasData,
	setOverseasData,
	setViewId,
	setCheckedRow,
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
		listConfig  : PAYRUN_AUDITED_PAYMENT_READY,
	});
	const [refetch, setRefetch] = useState(() => () => {});

	const [selectedPayrun, setSelectedPayrun] = useState(null);
	const [selectedIds, setSelectedIds] = useState([]);
	const { search, createdAt } = globalFilters || {};
	const { query = '', debounceQuery } = useDebounceQuery();
	const { payrunData, payrunLoading, payrunStats, getPayrunList } = useGetPayrun({
		activePayrunTab,
		overseasData,
		query,
		globalFilters,
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
	} = useGetAdvPaymentInvoiceList({ sort, query, globalFilters, activePayrunTab });
	const {
		getAdvancePaidData,
		paidAdvanceListData,
		paidAdvanceListLoading,
	} = useGetPaidAdvanceList({ activePayrunTab, query });
	const {
		getViewInvoice,
		viewInvoiceDataList,
		viewInvoiceDataLoading,
	} = useGetViewInvoices({ activePayrunTab, globalFilters, selectedPayrun, query });
	const {
		getViewInvoicesAdvancePayment, viewInvoicesAdvancePaymentData,
		viewInvoicesAdvancePaymentLoading,
	} = useGetAdvancePaymentView({ globalFilters, selectedPayrun, query });
	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		if ((PAYRUN_INNER_TAB_NAME).includes(activePayrunTab)) {
			if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
				getAdvancePaymentInvoiceList();
				setRefetch(() => () => {
					getAdvancePaymentInvoiceList();
				});
			} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
				getPayrunListView();
				setRefetch(() => () => {
					getPayrunListView();
				});
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData !== 'ADVANCE_PAYMENT')) {
				getViewInvoice();
				setRefetch(() => () => {
					getViewInvoice();
				});
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData === 'ADVANCE_PAYMENT')) {
				getViewInvoicesAdvancePayment();
				setRefetch(() => () => {
					getViewInvoicesAdvancePayment();
				});
			} else {
				getPayrunList();
				setRefetch(() => () => {
					getPayrunList();
				});
			}
		} else if (activePayrunTab === 'PAID') {
			if (overseasData === 'NORMAL') {
				getPaidList();
			} else if (overseasData === 'ADVANCE_PAYMENT') {
				getAdvancePaidData();
			}
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			getUploadHistoryList();
			setRefetch(() => () => {
				getUploadHistoryList();
			});
		}
	}, [activePayrunTab, overseasData, isInvoiceView, getViewInvoice, getAdvancePaymentInvoiceList, getPayrunListView,
		getPayrunList, getPaidList, getUploadHistoryList, createdAt, getAdvancePaidData, selectedPayrun,
		getViewInvoicesAdvancePayment]);

	useEffect(() => {
		let filteredConfig = {};
		if (activePayrunTab === 'PAYMENT_INITIATED' && !isInvoiceView) {
			filteredConfig = PAYMENT_INITIATED_PAYRUN;
		} else if (activePayrunTab === 'COMPLETED' && !isInvoiceView) {
			filteredConfig = PAYRUN_HISTORY_CONFIG;
		} else {
			filteredConfig = PAYRUN_AUDITED_PAYMENT_READY;
		}
		if ((PAYRUN_INNER_TAB_NAME).includes(activePayrunTab)) {
			if (overseasData === 'ADVANCE_PAYMENT' && isInvoiceView) {
				setApiData({
					listData    : advancePaymentInvoiceList,
					dataLoading : advancePaymentInvoiceLoading,
					listConfig  : ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
				});
			} else if ((overseasData === 'NORMAL' || overseasData === 'OVERSEAS') && isInvoiceView) {
				setApiData({
					listData    : billListViewData,
					dataLoading : billListViewLoading,
					listConfig  : activePayrunTab === 'COMPLETED' ? PAYRUN_HISTORY_INVOICE_CONFIG
						: INITIATED_LIST_VIEW_CONFIG,
				});
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData !== 'ADVANCE_PAYMENT')) {
				setApiData({
					listData    : viewInvoiceDataList,
					dataLoading : viewInvoiceDataLoading,
					listConfig  : activePayrunTab === 'AUDITED' ? VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG
						: VIEW_INVOICE_NORMAL_CONFIG,
				});
			} else if ((!isInvoiceView && !isEmpty(selectedPayrun) && overseasData === 'ADVANCE_PAYMENT')) {
				setApiData({
					listData    : viewInvoicesAdvancePaymentData,
					dataLoading : viewInvoicesAdvancePaymentLoading,
					listConfig  : activePayrunTab === 'AUDITED' ? VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG
						: ADVANCE_PAYMENT_VIEW_INVOICE,
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
					listConfig  : PAYRUN_PAID_NORMAL_CONFIG,
				});
			} else if (overseasData === 'ADVANCE_PAYMENT') {
				setApiData({
					listData    : paidAdvanceListData,
					dataLoading : paidAdvanceListLoading,
					listConfig  : ADVANCE_PAYMENT_PAYRUN_PAID_CONFIG,
				});
			}
		} else if (activePayrunTab === 'UPLOAD_HISTORY') {
			setApiData({
				listData    : uploadHistoryDataList,
				dataLoading : uploadHistoryListLoading,
				listConfig  : UPLOAD_HISTORY_CONFIG,
			});
		}
	}, [activePayrunTab, advancePaymentInvoiceList, advancePaymentInvoiceLoading, billListViewData, billListViewLoading,
		payrunData, payrunLoading, paidDataList, paidDataLoading, uploadHistoryDataList, uploadHistoryListLoading,
		isInvoiceView, overseasData, paidAdvanceListData, paidAdvanceListLoading, selectedPayrun, viewInvoiceDataList,
		viewInvoiceDataLoading, viewInvoicesAdvancePaymentData, viewInvoicesAdvancePaymentLoading]);

	useEffect(() => {
		setOverseasData('NORMAL');
		setViewId('');
		setSelectedPayrun(null);
		setCheckedRow(null);
		setSelectedIds([]);
		setGlobalFilters({
			search    : undefined,
			pageIndex : 1,
			pageSize  : 10,
		});
	}, [activePayrunTab, setCheckedRow, setOverseasData, setViewId]);

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
		refetch,
		selectedIds,
		setSelectedIds,
	};
};

export default useFilterData;
