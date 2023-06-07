import { Popover, Tooltip, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMOverflowDot,
	IcMInfo,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import ClickableDiv from '../../../../../../ClickableDiv';
import EditInvoice from '../EditInvoice';

import AddCustomerInvoice from './AddCustomerInvoice';
import ExchangeRateModal from './ExchangeRateModal';
import FillCustomerPortalData from './FillCustomerPortalData';
import styles from './styles.module.css';
import UpdateCustomerInvoice from './UpdateCustomerInvoice';

const AddRemarks = dynamic(() => import('../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../ChangeCurrency'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });

function Actions({
	invoice = {},
	bfInvoiceRefetch = () => {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	isAuthorized = false,
}) {
	const [show, setShow] = useState(false);
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [addCustomerInvoice, setAddCustomerInvoice] = useState(false);
	const [updateCustomerInvoice, setUpdateCustomerInvoice] = useState(false);
	const [fillCustomerData, setFillCustomerData] = useState(false);
	const [showExchangeRate, setExchangeRate] = useState(false);

	const { shipment_data } = useContext(ShipmentDetailContext);

	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.invoice_check_id
	&& invoice.status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments
		? isIRNGenerated
		: disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	const handleClickCurrency = () => {
		setIsChangeCurrency(true);
		setShow(false);
	};

	const handleClickRemarks = () => {
		setShow(false);
		setShowAddRemarks(true);
	};

	const handleChangePayment = () => {
		setShow(false);
		setShowChangePaymentMode(true);
	};

	const handleClickInvoice = () => {
		setShow(false);
		setIsEditInvoice(true);
	};

	const handleCustomerInvoice = () => {
		setShow(false);
		setAddCustomerInvoice(true);
	};

	const handleExchangeRateModal = () => {
		setShow(false);
		setExchangeRate(true);
	};

	const remarkRender = () => (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const handleRefetch = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity =	(shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
	|| isAuthorized;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div style={{ width: '100%' }}>
							<ClickableDiv
								className={styles.text}
								onClick={handleClickInvoice}
							>
								Edit Invoices

							</ClickableDiv>
							<div className={styles.line} />
						</div>
					) : null}

					<div>
						<ClickableDiv
							className={styles.text}
							onClick={handleClickCurrency}
						>
							Change Currency
						</ClickableDiv>
						<div className={styles.line} />
					</div>

					<ClickableDiv
						className={styles.text}
						onClick={handleClickRemarks}
					>
						Add Remarks
					</ClickableDiv>

					{invoice?.billing_address?.trade_party_type === 'self' ? (
						<div>
							<div className={styles.line} />
							<ClickableDiv
								className={styles.text}
								onClick={handleChangePayment}
							>
								Change Payment Mode
							</ClickableDiv>
						</div>
					) : null}
				</>
			) : null}

			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<ClickableDiv
						className={styles.text}
						onClick={() => window.open(url, '_blank')}
					>
						Exchange Rate Document
					</ClickableDiv>
					<div className={styles.line} />
					<ClickableDiv
						onClick={handleExchangeRateModal}
						className={styles.text}
					>
						Exchange Rate Sheet

					</ClickableDiv>
					<div>
						<div className={styles.line} />
						<ClickableDiv
							className={styles.text}
							onClick={handleCustomerInvoice}
						>
							{isEmpty(invoice?.customer_ftl_invoice) ? 'Add' : 'Download'}
								&nbsp;
							{['reviewed', 'approved'].includes(invoice?.status) ? '/Generate' : ''}
							Customer Invoice
						</ClickableDiv>
						{['reviewed', 'approved'].includes(invoice?.status) ? (
							<ClickableDiv
								className={styles.text}
								onClick={() => { setShow(false); setUpdateCustomerInvoice(true); }}
							>
								Update Customer Invoice
							</ClickableDiv>
						) : null}
					</div>
				</div>
			))}
			{['reviewed', 'approved'].includes(invoice?.status) ? (
				<div>
					<div className={styles.line} />
					<ClickableDiv
						className={styles.text}
						onClick={() => { setShow(false); setFillCustomerData(true); }}
					>
						Fill Shipment Data For Customer Portal
					</ClickableDiv>
				</div>
			) : null}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{invoice.status ? (
							<div className={styles.info_container}>
								{startCase(invoice.status)}
							</div>
						) : null}
					</div>

					{/* {invoice?.status === 'amendment_requested' ? (
						<Tooltip
							placement="bottom"
							theme="light"
							content={<AmendmentReasons invoice={invoice} />}
						>
							<div className={styles.icon_info_wrapper}>
								<IcCError width={17} height={17} />
							</div>
						</Tooltip>
					) : null} */}
				</div>

				<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>

					{(!disableAction || invoice.exchange_rate_document?.length > 0)
					&& invoice.status !== 'revoked' ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={content}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<ClickableDiv
								className={styles.icon_more_wrapper}
								onClick={() => setShow(!show)}
							>
								<IcMOverflowDot />
							</ClickableDiv>
						</Popover>
						)
						: (
							<div className={styles.empty_div} />
						)}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							content={remarkRender()}
						>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="#DDEBC0" />
							</div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{(invoice.services || []).length && isEditInvoice ? (
				<EditInvoice
					show={isEditInvoice}
					onClose={() => setIsEditInvoice(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{isChangeCurrency ? (
				<ChangeCurrency
					isChangeCurrency={isChangeCurrency}
					setIsChangeCurrency={setIsChangeCurrency}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showExchangeRate ? (
				<ExchangeRateModal
					showExchangeRate={showExchangeRate}
					setExchangeRate={setExchangeRate}
					invoice={invoice}
				/>
			) : null}

			{showAddRemarks ? (
				<AddRemarks
					showAddRemarks={showAddRemarks}
					setShowAddRemarks={setShowAddRemarks}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showChangePaymentMode ? (
				<ChangePaymentMode
					show={showChangePaymentMode}
					setShow={setShowChangePaymentMode}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{updateCustomerInvoice ? (
				<UpdateCustomerInvoice
					show={updateCustomerInvoice}
					setShow={setUpdateCustomerInvoice}
					closeModal={() => setUpdateCustomerInvoice(false)}
					refetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			{fillCustomerData ? (
				<FillCustomerPortalData
					show={fillCustomerData}
					closeModal={() => setFillCustomerData(false)}
					handleRefetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			{addCustomerInvoice ? (
				<AddCustomerInvoice
					show={addCustomerInvoice}
					setShow={setAddCustomerInvoice}
					closeModal={() => setAddCustomerInvoice(false)}
					handleRefetch={handleRefetch}
					invoice={invoice}
					shipmentData={shipment_data}
				/>
			) : null}

		</div>
	);
}

export default Actions;
