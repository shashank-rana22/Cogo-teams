import { ShipmentDetailContext } from '@cogoport/context';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import ClickableDiv from '../../../../../../../ClickableDiv';
import styles from '../styles.module.css';

const INVOICE_STATUS = ['reviewed', 'approved'];

function Content({
	isAuthorized = false,
	invoice = {},
	disableAction = false,
	setShow = () => {},
	setExchangeRate = () => {},
	setAddCustomerInvoice = () => {},
	setUpdateCustomerInvoice = () => {},
	setFillCustomerData = () => {},
	setIsEditInvoice = () => {},
	setIsChangeCurrency = () => {},
	setShowAddRemarks = () => {},
	setShowChangePaymentMode = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { is_cogo_assured = false, is_job_closed_financially = false } = shipment_data || {};

	const editInvoicesVisibility = !is_job_closed_financially && (
		(is_cogo_assured !== true && !invoice?.is_igst) || isAuthorized);

	const commonActions = invoice?.status !== 'approved' && !disableAction;

	const handleClick = (setState = () => {}) => {
		setShow(false);
		setState(true);
	};

	return (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisibility ? (
						<div style={{ width: '100%' }}>
							<ClickableDiv
								className={styles.text}
								onClick={() => handleClick(setIsEditInvoice)}
							>
								Edit Invoices
							</ClickableDiv>

							<div className={styles.line} />
						</div>
					) : null}

					{!is_job_closed_financially ? (
						<div>
							<ClickableDiv
								className={styles.text}
								onClick={() => handleClick(setIsChangeCurrency)}
							>
								Change Currency
							</ClickableDiv>

							<div className={styles.line} />
						</div>
					) : null}

					{!is_job_closed_financially ? (
						<ClickableDiv
							className={styles.text}
							onClick={() => handleClick(setShowAddRemarks)}
						>
							Add Remarks
						</ClickableDiv>
					) : null}

					{!is_job_closed_financially && invoice?.billing_address?.trade_party_type === 'self' ? (
						<div>
							<div className={styles.line} />

							<ClickableDiv
								className={styles.text}
								onClick={() => handleClick(setShowChangePaymentMode)}
							>
								Change Payment Mode
							</ClickableDiv>
						</div>
					) : null}
				</>
			) : null}

			{(invoice?.exchange_rate_document || []).map((url) => (
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
						onClick={() => handleClick(setExchangeRate)}
						className={styles.text}
					>
						Exchange Rate Sheet

					</ClickableDiv>

					<div>
						<div className={styles.line} />

						<ClickableDiv
							className={styles.text}
							onClick={() => handleClick(setAddCustomerInvoice)}
						>
							{isEmpty(invoice?.customer_ftl_invoice) ? 'Add' : 'Download'}
							{' '}
							{INVOICE_STATUS.includes(invoice?.status) ? 'Generate' : ''}
							Customer Invoice
						</ClickableDiv>

						{INVOICE_STATUS.includes(invoice?.status) ? (
							<ClickableDiv
								className={styles.text}
								onClick={() => handleClick(setUpdateCustomerInvoice)}
							>
								Update Customer Invoice
							</ClickableDiv>
						) : null}
					</div>
				</div>
			))}

			{INVOICE_STATUS.includes(invoice?.status) ? (
				<div>
					<div className={styles.line} />

					<ClickableDiv
						className={styles.text}
						onClick={() => handleClick(setFillCustomerData)}
					>
						Fill Shipment Data For Customer Portal
					</ClickableDiv>
				</div>
			) : null}
		</div>
	);
}

export default Content;
