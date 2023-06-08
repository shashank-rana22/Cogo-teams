import { Popover, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMOverflowDot,
	IcMInfo,
} from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from '../../styles.module.css';

const INITIAL_STATE = 0;

function Actions({
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
	const showForOldShipments =	shipment_data?.serial_id <= GLOBAL_CONSTANTS.invoice_check_id
	&& invoice.status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments
		? isIRNGenerated
		: disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	const handleClick = (setState = () => {}) => {
		setState(true);
		setShow(false);
	};

	const remarkRender = (
		<div className={styles.remark_container}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity = shipment_data?.is_cogo_assured !== true
	|| user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div>
							<div
								role="button"
								tabIndex={INITIAL_STATE}
								className={styles.text}
								onClick={() => handleClick(setIsEditInvoice)}
							>
								Edit Invoice
							</div>
							<div className={styles.line} />
						</div>
					) : null}
					<div>
						<div
							role="button"
							tabIndex={INITIAL_STATE}
							className={styles.text}
							onClick={() => handleClick(setIsChangeCurrency)}
						>
							Change Currency
						</div>
						<div className={styles.line} />
					</div>
					<div
						role="button"
						tabIndex={INITIAL_STATE}
						className={styles.text}
						onClick={() => handleClick(setShowAddRemarks)}
					>
						Add Remarks
					</div>
					<div>
						<div className={styles.line} />
						<div
							role="button"
							tabIndex={INITIAL_STATE}
							className={styles.text}
							onClick={() => handleClick(setShowChangePaymentMode)}
						>
							Change Payment Mode
						</div>
					</div>
				</>
			) : null}
			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<div
						role="button"
						tabIndex={INITIAL_STATE}
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
		<div className={styles.actions_wrap}>
			{!disableAction || invoice.exchange_rate_document?.length > INITIAL_STATE ? (
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
						tabIndex={INITIAL_STATE}
						className={styles.icon_more_wrapper}
						onClick={() => setShow(!show)}
					>
						<IcMOverflowDot />
					</div>
				</Popover>
			) : (
				<div className={styles.empty_div} />
			)}

			{!isEmpty(invoice.remarks) ? (
				<Tooltip
					placement="bottom"
					theme="light-border"
					content={remarkRender}
				>
					<div className={styles.icon_more_wrapper}>
						<IcMInfo fill="yellow" />
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}

export default Actions;
