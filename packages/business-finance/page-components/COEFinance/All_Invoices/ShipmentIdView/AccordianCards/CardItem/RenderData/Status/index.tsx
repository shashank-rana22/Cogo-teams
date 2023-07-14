import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	status?: string;
	rejectionReason?: string;
}

interface PropsType {
	item: ItemTypes;
}

function Status({ item }: PropsType) {
	const { rejectionReason = '', status }: ItemTypes = item;
	if (status === 'FINANCE_ACCEPTED') {
		return <div className={styles.finance_accepted}>Finance Accepted</div>;
	}
	if (status === 'INITIATED') {
		return <div className={styles.initiated}>Initiated</div>;
	}
	if (status === 'LOCKED') {
		return <div className={styles.initiated}>LOCKED</div>;
	}
	if (status === 'ACCEPTED') {
		return <div className={styles.accepted}>Accepted</div>;
	}
	if (status === 'FINANCE_REJECTED') {
		return (
			<Tooltip
				interactive
				placement="top"
				content={<div className={styles.styledText}>{rejectionReason || '-'}</div>}
			>
				<div className={styles.finance_rejected}>Finance Rejected</div>

			</Tooltip>
		);
	}
	if (status === 'POSTED') {
		return <div className={styles.posted}>Posted</div>;
	}
	if (status === 'VOID') {
		return <div className={styles.void}>Void</div>;
	}
	if (status === 'COE_REJECTED') {
		return <div className={styles.coe_rejected}>COE Rejected</div>;
	}

	return (
		<div className={styles.draft}>
			{startCase(status!)}
			{' '}
		</div>
	);
}

export default Status;
