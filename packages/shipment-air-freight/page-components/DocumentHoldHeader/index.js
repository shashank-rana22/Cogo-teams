import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCError } from '@cogoport/icons-react';
import React, { useContext } from 'react';

import styles from './styles.module.css';

const STATUS_MAPPING = {
	eligible: {
		color         : 'var(--color-primary-yellow-1)',
		background    : 'var(--color-primary-yellow-5)',
		statusMessage : 'At Authority Desk',
	},
	ineligible: {
		color         : 'var(--color-primary-yellow-1)',
		background    : 'var(--color-primary-yellow-5)',
		statusMessage : 'At Authority Desk',
	},
	hold: {
		color         : 'var(--color-primary-error-red-2)',
		background    : 'var(var(--color-primary-error-red-5))',
		statusMessage : 'On Hold',
	},
	requested: {
		color         : 'var(--color-primary-yellow-1)',
		background    : 'var(--color-primary-yellow-5)',
		statusMessage : 'Pending for Approval',
	},
};

function DocumentHoldHeader() {
	const { primary_service, shipment_data } = useContext(
		ShipmentDetailContext,
	);

	const { inco_term } = primary_service || {};
	const { document_delay_status } = shipment_data || {};

	const tradeType = GLOBAL_CONSTANTS.options.inco_term[inco_term].trade_type;

	const status = STATUS_MAPPING[document_delay_status];

	return (
		<div
			className={styles.document_hold_container}
			style={{
				background: status.background,
			}}
		>
			<div className={styles.icon_wrapper}>
				<IcCError height={26} width={26} />
			</div>

			<div className={styles.flex_col}>
				<div
					className={styles.heading}
					style={{
						color: status.color,
					}}
				>
					{`Your ${tradeType === 'export' ? 'AWB' : 'DO'} Document is ${status.statusMessage}`}
				</div>
			</div>
		</div>
	);
}

export default DocumentHoldHeader;
