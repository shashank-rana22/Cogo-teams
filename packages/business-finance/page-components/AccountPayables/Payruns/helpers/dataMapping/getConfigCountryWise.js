import { INITIATED_LIST_VIEW_CONFIG } from '../../columns/initiatedListViewConfig';
import { INITIATED_LIST_VIEW_CONFIG_VN } from '../../columns/intiatedListViewConfigVN';
import { PAYRUN_HISTORY_INVOICE_CONFIG } from '../../columns/payrunHistoryInvoiceConfig';
import { PAYRUN_HISTORY_INVOICE_CONFIG_VN } from '../../columns/payrunHistoryInvoiceConfigVN';
import { PAYRUN_PAID_NORMAL_CONFIG } from '../../columns/payrunPaidConfig';
import { PAYRUN_PAID_NORMAL_CONFIG_VN } from '../../columns/payrunPaidConfigVN';
import { VIEW_INVOICE_NORMAL_CONFIG } from '../../columns/viewInvoiceForSelected';
import { VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG } from '../../columns/viewInvoiceForSelectedPaymentReady';
import { VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG_VN } from '../../columns/viewInvoiceForSelectedPaymentReadyVN';
import { VIEW_INVOICE_NORMAL_CONFIG_VN } from '../../columns/viewInvoiceForSelectedVN';
import { VIEW_INVOICE_PAYMENT_INITIATED_CONFIG } from '../../columns/viewInvoicePaymentInitiated';
import { VIEW_INVOICE_PAYMENT_INITIATED_CONFIG_VN } from '../../columns/viewInvoicePaymentInitiatedVN';
import { VIEW_INVOICE_PAYRUN_HISTORY_NORMAL_CONFIG } from '../../columns/viewInvoicePayrunHistory';
import { VIEW_INVOICE_PAYRUN_HISTORY_NORMAL_CONFIG_VN } from '../../columns/viewInvoicePayrunHistoryVN';

export const INITIATED_LIST_VIEW_CONFIG_COUNTRY_WISE = {
	IN : INITIATED_LIST_VIEW_CONFIG,
	VN : INITIATED_LIST_VIEW_CONFIG_VN,
};
export const VIEW_INVOICE_INITITED_CONFIG_COUNTRY_WISE = {
	IN : VIEW_INVOICE_NORMAL_CONFIG,
	VN : VIEW_INVOICE_NORMAL_CONFIG_VN,
};
export const VIEW_INVOICE_PAYMENT_READY_CONFIG_COUNTRY_WISE = {
	IN : VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG,
	VN : VIEW_INVOICE_NORMAL_PAYMENT_READY_CONFIG_VN,
};
export const VIEW_INVOICE_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE = {
	IN : VIEW_INVOICE_PAYRUN_HISTORY_NORMAL_CONFIG,
	VN : VIEW_INVOICE_PAYRUN_HISTORY_NORMAL_CONFIG_VN,
};
export const INVOICE_LIST_PAYRUN_HISTORY_CONFIG_COUNTRY_WISE = {
	IN : PAYRUN_HISTORY_INVOICE_CONFIG,
	VN : PAYRUN_HISTORY_INVOICE_CONFIG_VN,
};
export const PAID_NORMAL_CONFIG_COUNTRY_WISE = {
	IN : PAYRUN_PAID_NORMAL_CONFIG,
	VN : PAYRUN_PAID_NORMAL_CONFIG_VN,
};

export const VIEW_INVOICE_PAYMENT_INTIATED_COUNTRY_WISE = {
	IN : VIEW_INVOICE_PAYMENT_INITIATED_CONFIG,
	VN : VIEW_INVOICE_PAYMENT_INITIATED_CONFIG_VN,
};
