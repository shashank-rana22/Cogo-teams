import { Popover, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from '../../styles.module.css';

function KebabContent({
	invoice = {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	setIsChangeCurrency = () => {},
	setShowAddRemarks = () => {},
	setShowChangePaymentMode = () => {},
	setIsEditInvoice = () => {},
}) {
	const user_data = useSelector(({ profile }) => profile || {});
	const [show, setShow] = useState(false);
	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice.status === 'pending';

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

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
		|| user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					<div>
						{editInvoicesVisiblity ? (
							<div>
								<div
									role="button"
									tabIndex={0}
									className={styles.text}
									onClick={() => handleClick(setIsEditInvoice)}
								>
									Edit Invoice
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
				</div>
			))}
		</div>
	);

	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{(!disableAction || invoice.exchange_rate_document?.length)
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
		</div>
	);
}

export default KebabContent;
