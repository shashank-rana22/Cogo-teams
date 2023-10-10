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

	const { serial_id = '', is_cogo_assured = false } = shipment_data || {};

	const showForOldShipments = serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice?.status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice?.status)
	|| isEmpty(invoiceData?.invoice_trigger_date);

	let disableAction = showForOldShipments ? isIRNGenerated : disableActionCondition;

	if (invoice?.status === 'amendment_requested') {
		disableAction = false;
	}

	const commonActions = invoice?.status !== 'approved'
	&& !disableAction;

	const editInvoicesVisiblity = ((is_cogo_assured !== true && !invoice?.is_igst && !invoice?.processing)
	|| (invoice?.processing && invoice?.invoice_total_discounted === ZERO))
		|| [GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id,
			GLOBAL_CONSTANTS.uuid.santram_gurjar_user_id].includes(user_data?.user?.id);

	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{(!disableAction || invoice.exchange_rate_document?.length)
					&& invoice.status !== 'revoked'
					&& (!invoice?.processing
					|| (invoice?.invoice_total_discounted === ZERO && commonActions && editInvoicesVisiblity))
					&& notInsuranceService ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							className={styles.popover_content}
							content={(
								<PopoverContent
									setShow={setShow}
									setShowModal={setShowModal}
									invoice={invoice}
									commonActions={commonActions}
									editInvoicesVisiblity={editInvoicesVisiblity}
									showCancelOptions={showCancelOptions}
									shipment_data={shipment_data}
								/>
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
