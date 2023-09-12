import { Popover, cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from '../../styles.module.css';

import PopoverContent from './PopoverContent';

function KebabContent({
	invoice = {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	setShowModal = () => {},
	showCancelOptions = {},
}) {
	const ZERO = 0;
	const user_data = useSelector(({ profile }) => profile || {});
	const [show, setShow] = useState(false);

	const notInsuranceService = isEmpty(
		(invoice?.services || [])?.find(
			(s) => s?.service_type === 'cargo_insurance_service',
		),
	);

	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice.status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments ? isIRNGenerated : disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true
		&& !invoice?.is_igst
		&& (!invoice?.processing || invoice?.invoice_total_discounted === ZERO))
		|| [GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id,
			GLOBAL_CONSTANTS.uuid.santram_gurjar_user_id].includes(user_data?.user?.id);

	const handleClick = (modalName) => {
		setShowModal(modalName);
		setShow(false);
	};

	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{(!disableAction || invoice.exchange_rate_document?.length)
					&& invoice.status !== 'revoked'
					&& (!invoice?.processing || invoice?.invoice_total_discounted === ZERO)
					&& notInsuranceService ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							className={styles.popover_content}
							content={!(invoice?.processing) ? (
								<PopoverContent
									setShow={setShow}
									setShowModal={setShowModal}
									invoice={invoice}
									commonActions={commonActions}
									editInvoicesVisiblity={editInvoicesVisiblity}
									showCancelOptions={showCancelOptions}
								/>
							) : editInvoicesVisiblity && (
								<Button
									themeType="tertiary"
									className={styles.text}
									onClick={() => handleClick('edit_invoice')}
								>
									Edit Invoice
								</Button>
							)}
							onClickOutside={() => setShow(false)}
						>
							<Button
								themeType="tertiary"
								className={styles.icon_more_wrapper}
								onClick={() => setShow(!show)}
							>
								<IcMOverflowDot width={16} height={16} />
							</Button>
						</Popover>
				)
				: (
					<div className={styles.empty_div} />
				)}
		</div>
	);
}

export default KebabContent;
