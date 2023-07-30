import { ADVANCE_PAYMENT_PAYRUN_PAID_CONFIG } from '../../columns/advancePaidPayrunConfig';
import { ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG } from '../../columns/advPaymentPayrunHistoryConfig';
import { PAYRUN_AUDITED_PAYMENT_READY } from '../../columns/initiatedConfig';
import { INITIATED_LIST_VIEW_CONFIG } from '../../columns/initiatedListViewConfig';
import { PAYMENT_INITIATED_PAYRUN } from '../../columns/paymentInitiatedPayrunConfig';
import { PAYRUN_HISTORY_CONFIG } from '../../columns/payrunHistoryConfig';
import { PAYRUN_HISTORY_INVOICE_CONFIG } from '../../columns/payrunHistoryInvoiceConfig';
import { PAYRUN_PAID_NORMAL_CONFIG } from '../../columns/payrunPaidConfig';
import { UPLOAD_HISTORY_CONFIG } from '../../columns/uploadHistoryConfig';
import { VIEW_INVOICE_NORMAL_CONFIG } from '../../columns/viewInvoiceForSelected';
import { ADVANCE_PAYMENT_VIEW_INVOICE } from '../../columns/viewInvoiceForSelectedAdvance';
import { VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG } from '../../columns/viewInvoiceForSelectedAdvancePaymentReady';
import { VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG } from '../../columns/viewInvoiceForSelectedPaymentReady';
import useGetPaidAdvanceList from '../../hooks/useGetPaidAdvanceList';
import useGetPaidList from '../../hooks/useGetPaidList';
import useGetUploadHistoryList from '../../hooks/useGetUploadHistoryList';

import useGetMappingFunctions from './getMappingFunctions';

const useGetConfigDataMapping = ({
	activePayrunTab,
	overseasData,
	query,
	globalFilters,
	sort,
	selectedPayrun,
}) => {
	const {
		getNormalOverseasMapping,
		getAdvancePaymentMapping,
		payrunStats,
	} = useGetMappingFunctions({ activePayrunTab, overseasData, query, globalFilters, sort, selectedPayrun });

	const {
		getUploadHistoryList, uploadHistoryListLoading,
		uploadHistoryDataList,
	} = useGetUploadHistoryList({ sort, query, globalFilters });

	const {
		getAdvancePaidData,
		paidAdvanceListData,
		paidAdvanceListLoading,
	} = useGetPaidAdvanceList({ activePayrunTab, query, globalFilters });

	const { paidDataList, paidDataLoading, getPaidList } = useGetPaidList({ activePayrunTab, query, globalFilters });

	const configMapping = {
		INITIATED: getNormalOverseasMapping(
			PAYRUN_AUDITED_PAYMENT_READY,
			VIEW_INVOICE_NORMAL_CONFIG,
			INITIATED_LIST_VIEW_CONFIG,
		),
		AUDITED: {
			NORMAL: getNormalOverseasMapping(
				PAYRUN_AUDITED_PAYMENT_READY,
				VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG,
				INITIATED_LIST_VIEW_CONFIG,
			),
			OVERSEAS: getNormalOverseasMapping(
				PAYRUN_AUDITED_PAYMENT_READY,
				VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG,
				INITIATED_LIST_VIEW_CONFIG,
			),
			ADVANCE_PAYMENT: getAdvancePaymentMapping(
				PAYRUN_AUDITED_PAYMENT_READY,
				VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG,
				ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
			),
		},
		PAYMENT_INITIATED: {
			NORMAL: getNormalOverseasMapping(
				PAYMENT_INITIATED_PAYRUN,
				VIEW_INVOICE_NORMAL_CONFIG,
				INITIATED_LIST_VIEW_CONFIG,
			),
			OVERSEAS: getNormalOverseasMapping(
				PAYMENT_INITIATED_PAYRUN,
				VIEW_INVOICE_NORMAL_CONFIG,
				INITIATED_LIST_VIEW_CONFIG,
			),
			ADVANCE_PAYMENT: getAdvancePaymentMapping(
				PAYMENT_INITIATED_PAYRUN,
				ADVANCE_PAYMENT_VIEW_INVOICE,
				ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
			),
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
			NORMAL: getNormalOverseasMapping(
				PAYRUN_HISTORY_CONFIG,
				VIEW_INVOICE_NORMAL_CONFIG,
				PAYRUN_HISTORY_INVOICE_CONFIG,
			),
			OVERSEAS: getNormalOverseasMapping(
				PAYRUN_HISTORY_CONFIG,
				VIEW_INVOICE_NORMAL_CONFIG,
				PAYRUN_HISTORY_INVOICE_CONFIG,
			),
			ADVANCE_PAYMENT: getAdvancePaymentMapping(
				PAYRUN_HISTORY_CONFIG,
				ADVANCE_PAYMENT_VIEW_INVOICE,
				ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
			),
		},
	};

	return { configMapping, payrunStats };
};

export default useGetConfigDataMapping;
