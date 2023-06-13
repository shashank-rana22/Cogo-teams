import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMOverflowDot,
	IcMInfo,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import EditInvoice from '../EditInvoice';

import AddCustomerInvoice from './AddCustomerInvoice';
import ExchangeRateModal from './ExchangeRateModal';
import FillCustomerPortalData from './FillCustomerPortalData';
import InvoiceDetails from './InvoiceDetails';
import styles from './styles.module.css';
import UpdateCustomerInvoice from './UpdateCustomerInvoice';

const AddRemarks = dynamic(() => import('../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../ChangeCurrency'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });

const EMPTY_ARRAY_LENGTH = 0;

const DISABLE_STATUS = ['reviewed', 'approved'];

const remarkRender = ({ invoice }) => (
	<div className={styles.remarkcontainer}>
		<div className={styles.title}>Invoice Remarks</div>
		<div className={styles.value}>{invoice.remarks}</div>
	</div>
);

function Actions({
	invoice = {},
	bfInvoiceRefetch = () => {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	isAuthorized = false,
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice.status === 'pending';

	const disableActionCondition = DISABLE_STATUS.includes(invoice.status) || isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments ? isIRNGenerated : disableActionCondition;
	disableAction = invoice.status === 'amendment_requested' ? false : disableAction;

	const handleShowModal = (type) => {
		setShow(false);
		setShowModal(type);
	};

	const handleRefetch = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true && !invoice?.is_igst) || isAuthorized;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div className={styles.full_width}>
							<ClickableDiv className={styles.text} onClick={() => handleShowModal('isEditInvoice')}>
								Edit Invoices
							</ClickableDiv>
							<div className={styles.line} />
						</div>
					) : null}

					<div>
						<ClickableDiv className={styles.text} onClick={() => handleShowModal('isChangeCurrency')}>
							Change Currency
						</ClickableDiv>
						<div className={styles.line} />
					</div>

					<ClickableDiv className={styles.text} onClick={() => handleShowModal('showAddRemarks')}>
						Add Remarks
					</ClickableDiv>

					{invoice?.billing_address?.trade_party_type === 'self' ? (
						<div>
							<div className={styles.line} />
							<ClickableDiv
								className={styles.text}
								onClick={() => handleShowModal('showChangePaymentMode')}
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
					<ClickableDiv className={styles.text} onClick={() => window.open(url, '_blank')}>
						Exchange Rate Document
					</ClickableDiv>

					<div className={styles.line} />

					<ClickableDiv onClick={() => handleShowModal('showExchangeRate')} className={styles.text}>
						Exchange Rate Sheet
					</ClickableDiv>

					<div>
						<div className={styles.line} />
						<ClickableDiv className={styles.text} onClick={() => handleShowModal('addCustomerInvoice')}>
							{`${isEmpty(invoice?.customer_ftl_invoice) ? 'Add' : 'Download'} ${
								DISABLE_STATUS.includes(invoice?.status) ? '/Generate' : ''}Customer Invoice`}
						</ClickableDiv>

						{DISABLE_STATUS.includes(invoice?.status) ? (
							<ClickableDiv
								className={styles.text}
								onClick={() => handleShowModal('updateCustomerInvoice')}
							>
								Update Customer Invoice
							</ClickableDiv>
						) : null}
					</div>
				</div>
			))}
			{DISABLE_STATUS.includes(invoice?.status) ? (
				<div>
					<div className={styles.line} />
					<ClickableDiv className={styles.text} onClick={() => handleShowModal('fillCustomerData')}>
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
				</div>

				<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
					{(!disableAction || invoice.exchange_rate_document?.length > EMPTY_ARRAY_LENGTH)
					&& invoice.status !== 'revoked' ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={content}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<ClickableDiv className={styles.icon_more_wrapper} onClick={() => setShow(!show)}>
								<IcMOverflowDot />
							</ClickableDiv>
						</Popover>
						)
						: (
							<div className={styles.empty_div} />
						)}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip placement="bottom" content={remarkRender({ invoice })}>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="#DDEBC0" />
							</div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{(invoice.services || []).length && showModal === 'isEditInvoice' ? (
				<EditInvoice
					show={showModal === 'isEditInvoice'}
					onClose={() => setShowModal(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showModal === 'isChangeCurrency' ? (
				<ChangeCurrency
					show={showModal === 'isChangeCurrency'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showModal === 'showExchangeRate' ? (
				<ExchangeRateModal
					setShow={setShowModal}
					invoice={invoice}
					show={showModal === 'showExchangeRate'}
				/>
			) : null}

			{showModal === 'showAddRemarks' ? (
				<AddRemarks
					show={showModal === 'showAddRemarks'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showModal === 'showChangePaymentMode' ? (
				<ChangePaymentMode
					show={showModal === 'showChangePaymentMode'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showModal === 'updateCustomerInvoice' ? (
				<UpdateCustomerInvoice
					show={showModal === 'updateCustomerInvoice'}
					setShow={setShowModal}
					closeModal={() => setShowModal(false)}
					refetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			{showModal === 'fillCustomerData' ? (
				<FillCustomerPortalData
					show={showModal === 'fillCustomerData'}
					closeModal={() => setShowModal(false)}
					handleRefetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			{showModal === 'addCustomerInvoice' ? (
				<AddCustomerInvoice
					show={showModal === 'addCustomerInvoice'}
					setShow={setShowModal}
					closeModal={() => setShowModal(false)}
					handleRefetch={handleRefetch}
					invoice={invoice}
					shipmentData={shipment_data}
				/>
			) : null}
		</div>
	);
}

export default Actions;
