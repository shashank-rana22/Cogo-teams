import ClickableDiv from '../../../../../../../ClickableDiv';

import styles from './styles.module.css';

const CUSTOMER_INVOICE_STATUSES = ['reviewed', 'approved'];

function KebabContent({
	handleSetter = () => {},
	commonActions = false,
	editInvoicesVisiblity = false,
	invoice = {},
}) {
	return (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div style={{ width: '100%' }}>
							<ClickableDiv
								className={styles.text}
								onClick={() => handleSetter('isEditInvoice')}
							>
								Edit Invoices
							</ClickableDiv>
							<div className={styles.line} />
						</div>
					) : null}

					<div>
						<ClickableDiv
							className={styles.text}
							onClick={() => handleSetter('changeCurrency')}
						>
							Change Currency
						</ClickableDiv>
						<div className={styles.line} />
					</div>

					<ClickableDiv
						className={styles.text}
						onClick={() => handleSetter('addRemark')}
					>
						Add Remarks
					</ClickableDiv>

					{invoice?.billing_address?.trade_party_type === 'self' ? (
						<div>
							<div className={styles.line} />
							<ClickableDiv
								className={styles.text}
								onClick={() => handleSetter('paymentMode')}
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
						onClick={() => handleSetter('rateSheet')}
						className={styles.text}
					>
						Exchange Rate Sheet

					</ClickableDiv>
					<div>
						<div className={styles.line} />
						<ClickableDiv
							className={styles.text}
							onClick={() => handleSetter('addCustomerInvoice')}
						>
							Add
							{' '}
							{CUSTOMER_INVOICE_STATUSES.includes(invoice?.status) ? '/ Generate ' : ''}
							Customer Invoice
						</ClickableDiv>
					</div>
				</div>
			))}
			{CUSTOMER_INVOICE_STATUSES.includes(invoice?.status) ? (
				<div>
					<div className={styles.line} />
					<ClickableDiv
						className={styles.text}
						onClick={() => handleSetter('fillPortalData')}
					>
						Fill Shipment Data For Customer Portal
					</ClickableDiv>
				</div>
			) : null}
		</div>
	);
}

export default KebabContent;
