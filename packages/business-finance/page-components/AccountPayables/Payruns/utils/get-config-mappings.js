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
import useGetAdvancePaymentView from '../hooks/useGetAdvancePaymentView';
import useGetAdvPaymentInvoiceList from '../hooks/useGetAdvPaymentInvoiceList';
import useGetPaidAdvanceList from '../hooks/useGetPaidAdvanceList';
import useGetPaidList from '../hooks/useGetPaidList';
import useGetPayrun from '../hooks/useGetPayrun';
import useGetPayrunBillListView from '../hooks/useGetPayrunBillListView';
import useGetUploadHistoryList from '../hooks/useGetUploadHistoryList';
import useGetViewInvoices from '../hooks/useGetViewInvoices';

const useGetConfigMapping = ({
	activePayrunTab,
	overseasData,
	query,
	globalFilters,
	sort,
	selectedPayrun,
}) => {
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

	const getCommonConfig = (payrunConfig, viewConfig, viewData, viewLoading, viewFunction, listViewConfig) => ({
		false: {
			getConfig   : payrunConfig,
			getData     : payrunData,
			getLoading  : payrunLoading,
			getFunction : getPayrunList,
			true        : {
				getConfig   : viewConfig,
				getData     : viewData,
				getLoading  : viewLoading,
				getFunction : viewFunction,
			},
		},
		true: {
			getConfig   : listViewConfig,
			getData     : billListViewData,
			getLoading  : billListViewLoading,
			getFunction : getPayrunListView,
			true        : {},
		},
	});

	const configMapping = {
		INITIATED: getCommonConfig(
			PAYRUN_AUDITED_PAYMENT_READY,
			VIEW_INVOICE_NORMAL_CONFIG,
			viewInvoiceDataList,
			viewInvoiceDataLoading,
			getViewInvoice,
			INITIATED_LIST_VIEW_CONFIG,
		),
		AUDITED: {
			NORMAL: getCommonConfig(
				PAYRUN_AUDITED_PAYMENT_READY,
				VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG,
				viewInvoiceDataList,
				viewInvoiceDataLoading,
				getViewInvoice,
				INITIATED_LIST_VIEW_CONFIG,
			),
			OVERSEAS: getCommonConfig(
				PAYRUN_AUDITED_PAYMENT_READY,
				VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG,
				viewInvoiceDataList,
				viewInvoiceDataLoading,
				getViewInvoice,
				INITIATED_LIST_VIEW_CONFIG,
			),
			ADVANCE_PAYMENT: {
				...getCommonConfig(
					PAYRUN_AUDITED_PAYMENT_READY,
					VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG,
					viewInvoicesAdvancePaymentData,
					viewInvoicesAdvancePaymentLoading,
					getViewInvoicesAdvancePayment,
					ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
				),
				true: {
					getConfig   : ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
					getData     : advancePaymentInvoiceList,
					getLoading  : advancePaymentInvoiceLoading,
					getFunction : getAdvancePaymentInvoiceList,
				},
			},

		},
		PAYMENT_INITIATED: {
			NORMAL: getCommonConfig(
				PAYMENT_INITIATED_PAYRUN,
				VIEW_INVOICE_NORMAL_CONFIG,
				viewInvoiceDataList,
				viewInvoiceDataLoading,
				getViewInvoice,
				INITIATED_LIST_VIEW_CONFIG,
			),
			OVERSEAS: getCommonConfig(
				PAYMENT_INITIATED_PAYRUN,
				VIEW_INVOICE_NORMAL_CONFIG,
				viewInvoiceDataList,
				viewInvoiceDataLoading,
				getViewInvoice,
				INITIATED_LIST_VIEW_CONFIG,
			),
			ADVANCE_PAYMENT: {
				...getCommonConfig(
					PAYMENT_INITIATED_PAYRUN,
					ADVANCE_PAYMENT_VIEW_INVOICE,
					viewInvoicesAdvancePaymentData,
					viewInvoicesAdvancePaymentLoading,
					getViewInvoicesAdvancePayment,
					ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
				),
				true: {
					getConfig   : ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
					getData     : advancePaymentInvoiceList,
					getLoading  : advancePaymentInvoiceLoading,
					getFunction : getAdvancePaymentInvoiceList,
					true        : {},
				},
			},
		},
		PAID: {
			NORMAL: {

				getConfig   : PAYRUN_PAID_NORMAL_CONFIG,
				getData     : paidDataList,
				getLoading  : paidDataLoading,
				getFunction : getPaidList,
			},
			ADVANCE_PAYMENT: {
				getConfig   : ADVANCE_PAYMENT_PAYRUN_PAID_CONFIG,
				getData     : paidAdvanceListData,
				getLoading  : paidAdvanceListLoading,
				getFunction : getAdvancePaidData,
			},
		},
		UPLOAD_HISTORY: {
			getConfig   : UPLOAD_HISTORY_CONFIG,
			getData     : uploadHistoryDataList,
			getLoading  : uploadHistoryListLoading,
			getFunction : getUploadHistoryList,
		},
		COMPLETED: {
			NORMAL: getCommonConfig(
				PAYRUN_HISTORY_CONFIG,
				VIEW_INVOICE_NORMAL_CONFIG,
				viewInvoiceDataList,
				viewInvoiceDataLoading,
				getViewInvoice,
				PAYRUN_HISTORY_INVOICE_CONFIG,
			),
			OVERSEAS: getCommonConfig(
				PAYRUN_HISTORY_CONFIG,
				VIEW_INVOICE_NORMAL_CONFIG,
				viewInvoiceDataList,
				viewInvoiceDataLoading,
				getViewInvoice,
				PAYRUN_HISTORY_INVOICE_CONFIG,
			),
			ADVANCE_PAYMENT: {
				...getCommonConfig(
					PAYRUN_HISTORY_CONFIG,
					ADVANCE_PAYMENT_VIEW_INVOICE,
					viewInvoicesAdvancePaymentData,
					viewInvoicesAdvancePaymentLoading,
					getViewInvoicesAdvancePayment,
					ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
				),
				true: {
					getConfig   : ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
					getData     : advancePaymentInvoiceList,
					getLoading  : advancePaymentInvoiceLoading,
					getFunction : getAdvancePaymentInvoiceList,
					true        : {},
				},
			},
		},
	};

	return { configMapping, payrunStats };
};

export default useGetConfigMapping;
