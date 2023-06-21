import { Popover, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMOverflowDot,
	IcMInfo,
	IcMEmail,
} from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

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
	setSendEmail = () => {},
}) {
	const user_data = useSelector(({ profile }) => profile || {});
	const [show, setShow] = useState(false);

	const {
		status, remarks,
		exchange_rate_document, proforma_email_count = 0,
		sales_email_count = 0, sales_utr,
	} = invoice || {};

	const showForOldShipments =	shipment_data?.serial_id <= GLOBAL_CONSTANTS.invoice_check_id
	&& status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments ? isIRNGenerated : disableActionCondition;

	if (status === 'amendment_requested') {
		disableAction = false;
	}

	const handleClick = (setState = () => {}) => {
		setState(true);
		setShow(false);
	};

	const remark_container = (
		<div className={styles.remark_container}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{remarks}</div>
		</div>
	);

	const commonActions = status !== 'approved' && !disableAction;

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
								tabIndex={0}
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
				</>
			) : null}
			{(exchange_rate_document || []).map((url) => (
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
		<div className={styles.actions_wrap}>
			<div className={styles.email_wrapper}>
				<IcMEmail
					onClick={() => setSendEmail(true)}
				/>

				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div className={styles.tooltip_child}>
							<div className={styles.flex_row}>
								Proforma email sent :
								&nbsp;
								{proforma_email_count}
							</div>

							<div className={cl`${styles.flex_row} ${styles.margin}`}>
								Live email sent:
								&nbsp;
								{sales_email_count}
							</div>
							<div className={cl`${styles.flex_row} ${styles.utr_details}`}>
								<div className={cl`${styles.flex_row} ${styles.margin}`}>
									UTR Number:
									&nbsp;
									{sales_utr?.utr_number || ''}
								</div>
								<div className={cl`${styles.flex_row} ${styles.margin}`}>
									Status:
									&nbsp;
									{sales_utr?.status || ''}
								</div>
							</div>
						</div>
					)}
				>
					<div className={styles.icon_div}>
						<IcMInfo />
					</div>
				</Tooltip>
			</div>
			{!disableAction || !isEmpty(exchange_rate_document) ? (
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
			) : (
				<div className={styles.empty_div} />
			)}

			{!isEmpty(remarks) ? (
				<Tooltip
					placement="bottom"
					theme="light-border"
					content={remark_container}
				>
					<div className={styles.icon_more_wrapper}>
						<IcMInfo fill="yellow" />
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}

export default KebabContent;
