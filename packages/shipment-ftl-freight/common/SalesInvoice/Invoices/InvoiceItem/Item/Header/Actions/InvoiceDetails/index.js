import { Popover, Tooltip, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import {
	IcMOverflowDot,
	IcMInfo,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import ClickableDiv from '../../../../../../../ClickableDiv';
import styles from '../styles.module.css';

function InvoiceDetails({
	invoice = {},
	isAuthorized = false,
	disableAction = false,
	setShow = () => {},
	show = false,
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

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
	|| isAuthorized;

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const remarkRender = () => (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const handleClick = (setState = () => {}) => {
		setShow(false);
		setState(true);
	};

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
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

					<div>
						<ClickableDiv
							className={styles.text}
							onClick={() => handleClick(setIsChangeCurrency)}
						>
							Change Currency
						</ClickableDiv>
						<div className={styles.line} />
					</div>

					<ClickableDiv
						className={styles.text}
						onClick={() => handleClick(setShowAddRemarks)}
					>
						Add Remarks
					</ClickableDiv>

					{invoice?.billing_address?.trade_party_type === 'self' ? (
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
								&nbsp;
							{['reviewed', 'approved'].includes(invoice?.status) ? '/Generate' : ''}
							Customer Invoice
						</ClickableDiv>
						{['reviewed', 'approved'].includes(invoice?.status) ? (
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
			{['reviewed', 'approved'].includes(invoice?.status) ? (
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

	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{(!disableAction || !isEmpty(invoice.exchange_rate_document))
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
	);
}

export default InvoiceDetails;
