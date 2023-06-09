import { Popover, Tooltip, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import {
	IcMOverflowDot,
	IcMInfo,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import ClickableDiv from '../../../../../../ClickableDiv';

import styles from './styles.module.css';

const AddCustomerInvoice = dynamic(() => import('./AddCustomerInvoice'), { ssr: false });
const ExchangeRateModal = dynamic(() => import('./ExchangeRateModal'), { ssr: false });
const FillCustomerPortalData = dynamic(() => import('./FillCustomerPortalData'), { ssr: false });
const UpdateCustomerInvoice = dynamic(() => import('./UpdateCustomerInvoice'), { ssr: false });
const EditInvoice = dynamic(() => import('../EditInvoice'), { ssr: false });
const AddRemarks = dynamic(() => import('../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../ChangeCurrency'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });

const CUSTOMER_INVOICE_STATUSES = ['reviewed', 'approved'];

function Actions({
	invoice = {},
	bfInvoiceRefetch = () => {},
	salesInvoicesRefetch = () => {},
	isAuthorized = false,
	disableAction = false,
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

	const handleSetter = (setter = () => {}) => {
		setter(true);
		setShow(false);
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

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
	|| isAuthorized;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div style={{ width: '100%' }}>
							<ClickableDiv
								className={styles.text}
								onClick={() => handleSetter(setIsEditInvoice)}
							>
								Edit Invoices

							</ClickableDiv>
							<div className={styles.line} />
						</div>
					) : null}

					<div>
						<ClickableDiv
							className={styles.text}
							onClick={() => handleSetter(setIsChangeCurrency)}
						>
							Change Currency
						</ClickableDiv>
						<div className={styles.line} />
					</div>

					<ClickableDiv
						className={styles.text}
						onClick={() => handleSetter(setShowAddRemarks)}
					>
						Add Remarks
					</ClickableDiv>

					{invoice?.billing_address?.trade_party_type === 'self' ? (
						<div>
							<div className={styles.line} />
							<ClickableDiv
								className={styles.text}
								onClick={() => handleSetter(setShowChangePaymentMode)}
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
						onClick={() => handleSetter(setExchangeRate)}
						className={styles.text}
					>
						Exchange Rate Sheet

					</ClickableDiv>
					<div>
						<div className={styles.line} />
						<ClickableDiv
							className={styles.text}
							onClick={() => handleSetter(setAddCustomerInvoice)}
						>
							{isEmpty(invoice?.customer_ftl_invoice) ? 'Add' : 'Download'}
								&nbsp;
							{CUSTOMER_INVOICE_STATUSES.includes(invoice?.status) ? '/Generate' : ''}
							Customer Invoice
						</ClickableDiv>
						{CUSTOMER_INVOICE_STATUSES.includes(invoice?.status) ? (
							<ClickableDiv
								className={styles.text}
								onClick={() => handleSetter(setUpdateCustomerInvoice)}
							>
								Update Customer Invoice
							</ClickableDiv>
						) : null}
					</div>
				</div>
			))}
			{CUSTOMER_INVOICE_STATUSES.includes(invoice?.status) ? (
				<div>
					<div className={styles.line} />
					<ClickableDiv
						className={styles.text}
						onClick={() => handleSetter(setFillCustomerData)}
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
					setIsChangeCurrency={setIsChangeCurrency}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showExchangeRate ? (
				<ExchangeRateModal
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
