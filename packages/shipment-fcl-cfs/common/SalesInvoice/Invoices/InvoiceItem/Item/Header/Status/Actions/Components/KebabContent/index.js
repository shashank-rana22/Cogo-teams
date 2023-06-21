import { Popover, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot, IcMInfo } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from '../../styles.module.css';

const MINIMUM_DOCUMENT_LENGTH = 0;

function KebabContent({
	invoice = {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	setIsChangeCurrency = () => {},
	setShowAddRemarks = () => {},
	setShowChangePaymentMode = () => {},
	setExchangeRate = () => {},
	setIsEditInvoice = () => {},
}) {
	const [show, setShow] = useState(false);
	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice.status === 'pending';

	const user_data = useSelector((({ profile }) => profile?.user));

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments ? isIRNGenerated : disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	const handleClick = (setState = () => {}) => {
		setState(true);
		setShow(false);
	};

	const remarkRender = () => (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true)
		|| user_data.email === 'ajeet@cogoport.com';

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					<div>
						{editInvoicesVisiblity ? (
							<div style={{ width: '100%' }}>
								<div
									role="button"
									tabIndex={0}
									className={styles.text}
									onClick={() => handleClick(setIsEditInvoice)}
								>
									Edit Invoices

								</div>
								<div className={styles.line} />
							</div>
						) : null}

						<div
							role="button"
							tabIndex={0}
							className={styles.text}
							onClick={() => handleClick(setIsChangeCurrency)}
						>
							Change Currency
						</div>
						<div className={styles.line} />
					</div>

					<div
						role="button"
						tabIndex={0}
						className={styles.text}
						onClick={() => handleClick(setShowAddRemarks)}
					>
						Add Remarks
					</div>

					{invoice?.billing_address?.trade_party_type === 'self' ? (
						<div>
							<div className={styles.line} />
							<div
								role="button"
								tabIndex={0}
								className={styles.text}
								onClick={() => handleClick(setShowChangePaymentMode)}
							>
								Change Payment Mode
							</div>
						</div>
					) : null}
				</>
			) : null}

			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<div
						role="button"
						tabIndex={0}
						className={styles.text}
						onClick={() => window.open(url, '_blank')}
					>
						Exchange Rate Document
					</div>
					<div
						role="button"
						tabIndex={0}
						onClick={() => handleClick(setExchangeRate)}
						className={styles.text}
					>
						Exchange Rate Sheet

					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{(!disableAction || invoice.exchange_rate_document?.length > MINIMUM_DOCUMENT_LENGTH)
					&& invoice.status !== 'revoked' ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={content}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<div
								role="button"
								tabIndex={0}
								className={styles.icon_more_wrapper}
								onClick={() => setShow(!show)}
							>
								<IcMOverflowDot />
							</div>
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

export default KebabContent;
