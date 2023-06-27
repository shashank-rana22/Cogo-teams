import { ShipmentDetailContext } from '@cogoport/context';
import { IcCError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import IncoTermMapping from '../../configurations/inco_term_mapping.json';

import styles from './styles.module.css';

const COLOR_MAPPING = {
	eligible   : 'yellow',
	ineligible : 'yellow',
	hold       : 'red',
	requested  : 'yellow',
};

function DocumentHoldHeader() {
	const { primary_service, shipment_data } = useContext(
		ShipmentDetailContext,
	);

	const { inco_term } = primary_service || {};
	const { document_delay_status } = shipment_data || {};
	const tradeType = IncoTermMapping[inco_term];

	let status = startCase(document_delay_status);
	if (document_delay_status === 'hold') {
		status = 'On Hold';
	} else if (['eligible', 'ineligible'].includes(document_delay_status)) {
		status = 'At Authority Desk';
	} else if (document_delay_status === 'requested') {
		status = 'Pending for Approval';
	}

	const color = COLOR_MAPPING[document_delay_status];

	return (
		<div
			className={styles.document_hold_container}
			style={{
				background: color === 'yellow'
					? 'var(--color-primary-yellow-5)' : 'var(--color-primary-error-red-5)',
			}}
		>
			<div className={styles.icon_wrapper}>
				<IcCError height={26} width={26} />
			</div>

			<div className={styles.flex_col}>
				<div
					className={styles.heading}
					style={{
						color: color === 'yellow'
							? 'var(--color-primary-yellow-1)' : 'var(--color-primary-error-red-2)',
					}}
				>
					Your
					{' '}
					{tradeType === 'export' ? 'AWB' : 'DO'}
					{' '}
					Document is
					{' '}
					{status}
				</div>
			</div>
		</div>
	);
}

export default DocumentHoldHeader;
