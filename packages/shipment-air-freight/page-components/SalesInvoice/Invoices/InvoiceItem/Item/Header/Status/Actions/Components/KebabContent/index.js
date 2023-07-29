import { Popover, Tooltip, cl, Button, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot, IcMInfo } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from '../../styles.module.css';

function Content({
	commonActions = false,
	editInvoicesVisibility = false,
	handleClick = () => {},
	setIsChangeCurrency = () => {},
	setShowAddRemarks = () => {},
	setShowChangePaymentMode = () => {},
	setIsEditInvoice = () => {},
	setExchangeRate = () => {},
	invoice = {},
}) {
	return (
		<div className={styles.dialog_box}>
			{commonActions && (
				<>
					<>
						{editInvoicesVisibility ? (
							<div>
								<Button
									themeType="tertiary"
									onClick={() => handleClick(setIsEditInvoice)}
								>
									Edit Invoice
								</Button>
								<div className={styles.line} />

							</div>
						) : null}
						<Button
							themeType="tertiary"
							onClick={() => handleClick(setIsChangeCurrency)}
						>
							Change Currency
						</Button>
						<div className={styles.line} />
					</>
					<Button
						themeType="tertiary"
						onClick={() => handleClick(setShowAddRemarks)}
					>
						Add Remarks
					</Button>

					{invoice?.billing_address?.trade_party_type === 'self' && (
						<div>
							<div className={styles.line} />
							<Button
								themeType="tertiary"
								onClick={() => handleClick(setShowChangePaymentMode)}
							>
								Change Payment Mode
							</Button>
						</div>
					)}
				</>
			)}

			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions && <div className={styles.line} />}
					<Button
						themeType="tertiary"
						onClick={() => window.open(url, '_blank')}
					>
						Exchange Rate Document
					</Button>
					<div className={styles.line} />
					<Button
						themeType="tertiary"
						onClick={() => handleClick(setExchangeRate)}
					>
						Exchange Rate Sheet
					</Button>
				</div>
			))}
		</div>
	);
}

function KebabContent({
	invoice = {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	setIsChangeCurrency = () => {},
	setShowAddRemarks = () => {},
	setShowChangePaymentMode = () => {},
	setIsEditInvoice = () => {},
	setExchangeRate = () => {},
}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
	const isAuthorizedUser = user_data?.user?.id === GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id;

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

	const remarkRender = () => (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const commonActions = invoice.status !== 'approved' && !disableAction;

	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{(!disableAction || invoice.exchange_rate_document?.length)
					&& invoice.status !== 'revoked' ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={(
								<Content
									commonActions={commonActions}
									editInvoicesVisibility={!shipment_data?.is_cogo_assured && isAuthorizedUser}
									handleClick={handleClick}
									setIsChangeCurrency={setIsChangeCurrency}
									setShowAddRemarks={setShowAddRemarks}
									setShowChangePaymentMode={setShowChangePaymentMode}
									setIsEditInvoice={setIsEditInvoice}
									setExchangeRate={setExchangeRate}
									invoice={invoice}
								/>
							)}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<ButtonIcon
								className={styles.icon_more_wrapper}
								onClick={() => setShow((prev) => !prev)}
								icon={<IcMOverflowDot />}
							/>
						</Popover>
				)
				: (
					<div className={styles.empty_div} />
				)}

			{!isEmpty(invoice.remarks) && (
				<Tooltip
					placement="bottom"
					content={remarkRender()}
				>
					<div className={styles.icon_more_wrapper}>
						<IcMInfo fill="#DDEBC0" />
					</div>
				</Tooltip>
			)}
		</div>
	);
}

export default KebabContent;
