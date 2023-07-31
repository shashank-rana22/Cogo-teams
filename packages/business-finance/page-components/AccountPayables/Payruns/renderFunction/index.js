import React from 'react';

import RenderTooltip from '../../../commons/RenderTooltip';
import InvoiceDetailsTimeLine from '../../Invoices/InvoiceTable/RenderFunctions/InvoiceDetailsTimeLine';

import BankDetails from './BankDetails';
import DeletePayrunInvoice from './DeletePayrunInvoice';
import DeleteSingleInvoice from './DeleteSingleInvoice';
import DownloadOverseasInvoice from './DownloadOverseasInvoice';
import DownloadOverseasUTR from './DownloadOverseasUTR';
import DownloadUploadHistoryStatusFile from './DownloadUplaodHistoryStatusFile.js';
import DownloadUploadHistoryFile from './DownloadUploadHistoryFile.js';
import FormatAmountCurrency from './FormatAmountCurrency';
import PaidDropDown from './PaidDropDown';
import PaidPaymentStatus from './PaidPaymentStatus';
import PaymentInitiatedPayrunDownload from './PaymentInitiatedPayrunDownload.js';
import PaymentReadyCheckbox from './PaymentReadyCheckbox';
import RadioSelectPayrun from './RadioSelectPayrun';
import RibbonData from './RibbonData';
import ShowAction from './ShowAction';
import UrgencyTag from './UrgencyTag';
import ViewInvoices from './ViewInvoice';

const SHOW_TOOLTIP_MAX_LENGTH = 24;

const renderFunctions = (
	{
		overseasData = '',
		viewId = null,
		setViewId = () => {},
		setDropDownData = () => {},
		setLoadingDropDown = () => {},
		selectedPayrun = null,
		setSelectedPayrun = () => {},
		checkedRow = null,
		setCheckedRow = () => {},
		refetch = () => {},
		selectedIds = [],
		setSelectedIds = () => {},
	},
) => {
	const functions = {
		renderFormatedAmount: (itemData) => (
			<FormatAmountCurrency itemData={itemData} />
		),
		renderTrashPayrun: (itemData) => (
			<DeletePayrunInvoice itemData={itemData} overseasData={overseasData} refetch={refetch} />
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
				<RenderTooltip content={organizationName} maxLength={SHOW_TOOLTIP_MAX_LENGTH} />
			);
		},
		renderInvoiceTimeLine: (itemData) => (
			<InvoiceDetailsTimeLine item={itemData} />
		),
		renderAction: (itemData) => (
			<ShowAction itemData={itemData} refetch={refetch} overseasData={overseasData} />
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
					itemData={itemData}
					setViewId={setViewId}
					showAccordian={viewId === objectId}
					setDropDownData={setDropDownData}
					setLoadingDropDown={setLoadingDropDown}
					overseasData={overseasData}
					viewId={viewId}
				/>
			);
		},
		renderOverseasUtr: (itemData) => (itemData?.type === 'OVERSEAS' ? (
			<DownloadOverseasUTR itemData={itemData} />
		) : null),
		renderPaidPaymentStatus: (itemData) => (
			<PaidPaymentStatus itemData={itemData} />
		),
		renderPaymentInitiatedPayrunDownload: (itemData) => (
			<PaymentInitiatedPayrunDownload itemData={itemData} />
		),
		renderRadioToSelectPayrun: (itemData) => (
			<RadioSelectPayrun
				itemData={itemData}
				checkedRow={checkedRow}
				setCheckedRow={setCheckedRow}
			/>
		),
		renderTrashInvoice: (itemData) => (
			<DeleteSingleInvoice itemData={itemData} overseasData={overseasData} refetch={refetch} />
		),
		renderCheckbox: (itemData) => (
			<PaymentReadyCheckbox
				itemData={itemData}
				selectedIds={selectedIds}
				setSelectedIds={setSelectedIds}
			/>
		),
	};
	return {
		functions,
	};
};

export default renderFunctions;
