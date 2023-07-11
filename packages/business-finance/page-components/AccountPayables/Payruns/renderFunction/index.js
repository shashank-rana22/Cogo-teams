import React from 'react';

import RenderTooltip from '../../../commons/RenderTooltip';
import InvoiceDetailsTimeLine from '../../Invoices/InvoiceTable/RenderFunctions/InvoiceDetailsTimeLine';

import BankDetails from './BankDetails';
import DeletePayrun from './DeletePayrun';
import DownloadOverseasInvoice from './DownloadOverseasInvoice';
import DownloadUploadHistoryStatusFile from './DownloadUplaodHistoryStatusFile.js';
import DownloadUploadHistoryFile from './DownloadUploadHistoryFile.js';
import FormatAmountCurrency from './FormatAmountCurrency';
import PaidDropDown from './PaidDropDown';
import PaidPaymentStatus from './PaidPaymentStatus';
import PaymentInitiatedPayrunDownload from './PaymentInitiatedPayrunDownload.js';
import RibbonData from './RibbonData';
import ShowAction from './ShowAction';
import UrgencyTag from './UrgencyTag';
import ViewInvoices from './ViewInvoice';

const RenderFunctions = (
	overseasData,
	viewId,
	setViewId,
	activeAdvPaid,
	setDropDownData,
	setLoadingDropDown,
	selectedPayrun,
	setSelectedPayrun = () => {},
) => {
	const functions = {
		renderFormatedAmount: (itemData) => (
			<FormatAmountCurrency itemData={itemData} />
		),
		renderTrashInvoice: () => (
			<DeletePayrun />
		),
		renderViewInvoice: (itemData) => (
			<ViewInvoices itemData={itemData} selectedPayrun={selectedPayrun} setSelectedPayrun={setSelectedPayrun} />
		),
		renderRibbon: (itemData) => (
			<RibbonData itemData={itemData} />
		),
		renderTooltip: (itemData) => {
			const { organizationName } = itemData || {};
			return (
				<RenderTooltip content={organizationName} maxLength={12} />
			);
		},
		renderInvoiceTimeLine: (itemData) => (
			<InvoiceDetailsTimeLine item={itemData} />
		),
		renderAction: (itemData) => (
			<ShowAction itemData={itemData} />
		),
		renderBankDetails: (itemData) => (
			<BankDetails itemData={itemData} />
		),
		renderUrgencyData: (itemData) => (
			<UrgencyTag itemData={itemData} />
		),
		renderDownloadUploadHistoryFile: (itemData) => (
			<DownloadUploadHistoryFile itemData={itemData} />
		),
		renderStatusDownload: (itemData) => (
			<DownloadUploadHistoryStatusFile itemData={itemData} />
		),
		renderDownloadOverseasInvoice: (itemData) => (
			<DownloadOverseasInvoice itemData={itemData} overseasData={overseasData} />
		),
		renderDropDownData: (itemData) => {
			const { objectId = '' } = itemData || {};
			return (
				<PaidDropDown
					setViewId={setViewId}
					showAccordian={viewId === objectId}
					itemData={itemData}
					setDropDownData={setDropDownData}
					setLoadingDropDown={setLoadingDropDown}
					activeAdvPaid={activeAdvPaid}
				/>
			);
		},
		renderPaidPaymentStatus: (itemData) => (
			<PaidPaymentStatus itemData={itemData} />
		),
		renderPaymentInitiatedPayrunDownload: (itemData) => (
			<PaymentInitiatedPayrunDownload itemData={itemData} />
		),
	};
	return {
		functions,
	};
};

export default RenderFunctions;
