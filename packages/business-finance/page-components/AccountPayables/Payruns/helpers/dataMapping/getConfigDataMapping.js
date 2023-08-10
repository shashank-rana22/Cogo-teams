import { useSelector } from '@cogoport/store';

import { ADVANCE_PAYMENT_PAYRUN_PAID_CONFIG } from '../../columns/advancePaidPayrunConfig';
import { ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG } from '../../columns/advPaymentPayrunHistoryConfig';
import { PAYRUN_AUDITED_PAYMENT_READY } from '../../columns/initiatedConfig';
import { PAYMENT_INITIATED_PAYRUN } from '../../columns/paymentInitiatedPayrunConfig';
import { PAYRUN_HISTORY_CONFIG } from '../../columns/payrunHistoryConfig';
import { UPLOAD_HISTORY_CONFIG } from '../../columns/uploadHistoryConfig';
import { ADVANCE_PAYMENT_VIEW_INVOICE } from '../../columns/viewInvoiceForSelectedAdvance';
import { VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG } from '../../columns/viewInvoiceForSelectedAdvancePaymentReady';
import useGetPaidAdvanceList from '../../hooks/useGetPaidAdvanceList';
import useGetPaidList from '../../hooks/useGetPaidList';
import useGetUploadHistoryList from '../../hooks/useGetUploadHistoryList';

import { getCommonMapping } from './getCommonMapping';
import {
	INITIATED_LIST_VIEW_CONFIG_COUNTRY_WISE,
	INVOICE_LIST_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE,
	PAID_NORMAL_CONFIG_COUNTRY_WISE,
	VIEW_INVOICE_INITITED_CONFIG_COUNTRY_WISE,
	VIEW_INVOICE_PAYMENT_INTIATED_COUNTRY_WISE,
	VIEW_INVOICE_PAYMENT_READY_CONFIG_COUNTRY_WISE,
	VIEW_INVOICE_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE,
} from './getConfigCountryWise';
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
		payrunCommonConfig,
		viewInvoiceCommonConfig,
		listInoiceCommonConfig,
		advancePaymentViewInvoiceCommonConfig,
		advancePaymentListView,
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

	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;
	const { country = {} } = partner;
	const { country_code = '' } = country;

	const configMapping = {
		INITIATED: getCommonMapping({
			payrunConfig      : PAYRUN_AUDITED_PAYMENT_READY,
			viewInvoiceConfig : VIEW_INVOICE_INITITED_CONFIG_COUNTRY_WISE[country_code],
			listViewConfig    : INITIATED_LIST_VIEW_CONFIG_COUNTRY_WISE[country_code],
			payrunCommonConfig,
			viewInvoiceCommonConfig,
			listInoiceCommonConfig,
		}),
		AUDITED: {
			NORMAL: getCommonMapping(
				{
					payrunConfig      : PAYRUN_AUDITED_PAYMENT_READY,
					viewInvoiceConfig : VIEW_INVOICE_PAYMENT_READY_CONFIG_COUNTRY_WISE[country_code],
					listViewConfig    : INITIATED_LIST_VIEW_CONFIG_COUNTRY_WISE[country_code],
					payrunCommonConfig,
					viewInvoiceCommonConfig,
					listInoiceCommonConfig,
				},
			),
			OVERSEAS: getCommonMapping(
				{
					payrunConfig      : PAYRUN_AUDITED_PAYMENT_READY,
					viewInvoiceConfig : VIEW_INVOICE_PAYMENT_READY_CONFIG_COUNTRY_WISE[country_code],
					listViewConfig    : INITIATED_LIST_VIEW_CONFIG_COUNTRY_WISE[country_code],
					payrunCommonConfig,
					viewInvoiceCommonConfig,
					listInoiceCommonConfig,
				},
			),
			ADVANCE_PAYMENT: getCommonMapping(
				{
					payrunConfig            : PAYRUN_AUDITED_PAYMENT_READY,
					viewInvoiceConfig       : VIEW_INVOICE_ADVANCE_PAYMENT_READY_CONFIG,
					listViewConfig          : ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
					payrunCommonConfig,
					viewInvoiceCommonConfig : advancePaymentViewInvoiceCommonConfig,
					listInoiceCommonConfig  : advancePaymentListView,
				},
			),
		},
		PAYMENT_INITIATED: {
			NORMAL: getCommonMapping({
				payrunConfig      :	PAYMENT_INITIATED_PAYRUN,
				viewInvoiceConfig :	VIEW_INVOICE_PAYMENT_INTIATED_COUNTRY_WISE[country_code],
				listViewConfig    : INITIATED_LIST_VIEW_CONFIG_COUNTRY_WISE[country_code],
				payrunCommonConfig,
				viewInvoiceCommonConfig,
				listInoiceCommonConfig,
			}),
			OVERSEAS: getCommonMapping(
				{
					payrunConfig      :	PAYMENT_INITIATED_PAYRUN,
					viewInvoiceConfig : VIEW_INVOICE_PAYMENT_INTIATED_COUNTRY_WISE[country_code],
					listViewConfig    : INITIATED_LIST_VIEW_CONFIG_COUNTRY_WISE[country_code],
					payrunCommonConfig,
					viewInvoiceCommonConfig,
					listInoiceCommonConfig,
				},
			),
			ADVANCE_PAYMENT: getCommonMapping(
				{
					payrunConfig            : PAYMENT_INITIATED_PAYRUN,
					viewInvoiceConfig       : ADVANCE_PAYMENT_VIEW_INVOICE,
					listViewConfig          : ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
					payrunCommonConfig,
					viewInvoiceCommonConfig : advancePaymentViewInvoiceCommonConfig,
					listInoiceCommonConfig  : advancePaymentListView,
				},
			),
		},
		PAID: {
			NORMAL: {
				getConfig   : PAID_NORMAL_CONFIG_COUNTRY_WISE[country_code],
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
			NORMAL: getCommonMapping(
				{
					payrunConfig      :	PAYRUN_HISTORY_CONFIG,
					viewInvoiceConfig :	VIEW_INVOICE_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE[country_code],
					listViewConfig    :	INVOICE_LIST_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE[country_code],
					payrunCommonConfig,
					viewInvoiceCommonConfig,
					listInoiceCommonConfig,
				},
			),
			OVERSEAS: getCommonMapping(
				{
					payrunConfig      :	PAYRUN_HISTORY_CONFIG,
					viewInvoiceConfig :	VIEW_INVOICE_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE[country_code],
					listViewConfig    :	INVOICE_LIST_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE[country_code],
					payrunCommonConfig,
					viewInvoiceCommonConfig,
					listInoiceCommonConfig,
				},
			),
			ADVANCE_PAYMENT: getCommonMapping(
				{
					payrunConfig            :	PAYRUN_HISTORY_CONFIG,
					viewInvoiceConfig       : ADVANCE_PAYMENT_VIEW_INVOICE,
					listViewConfig          : ADVANCE_PAYMENT_PAYRUN_HISTORY_CONFIG,
					payrunCommonConfig,
					viewInvoiceCommonConfig : advancePaymentViewInvoiceCommonConfig,
					listInoiceCommonConfig  : advancePaymentListView,
				},
			),
		},
	};

	return { configMapping, payrunStats, country_code };
};

export default useGetConfigDataMapping;
