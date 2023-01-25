import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

interface itemTypes {
	status?: string;
}

interface propsType {
	item: itemTypes;
	field: any;
}

function Status({ item, field }: propsType) {
	const { status }: itemTypes = item;
	if (status === 'FINANCE_ACCEPTED') {
		return <div className={styles.financeAccepted}>Finance Accepted</div>;
	} if (status === 'INITIATED') {
		return <div className={styles.initiated}>Initiated</div>;
	} if (status === 'ACCEPTED') {
		return <div className={styles.accepted}>Accepted</div>;
	} if (status === 'financeRejected') {
		return (
			<div className={styles.StatusFinanceRejected}>Finance Rejected</div>
		);
	} if (status === 'POSTED') {
		return <div className={styles.posted}>Posted</div>;
	} if (status === 'VOID') {
		return <div className={styles.void}>Void</div>;
	} if (status === 'COE_REJECTED') {
		return <div className={styles.coeRejected}>COE Rejected</div>;
	}

	return (
		<div className={styles.draft}>
	{startCase(status!)}
	{' '}
</div>
	);
}

export default Status;
