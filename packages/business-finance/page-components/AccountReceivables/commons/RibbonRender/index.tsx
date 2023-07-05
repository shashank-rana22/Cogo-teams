import React from 'react';

import styles from './styles.module.css';

interface InvoiceAdditionals {
	reqCancelReason?: string,
}

interface ItemData {
	daysLeftForAutoIrnGeneration?: string,
	invoiceAdditionals?: InvoiceAdditionals
}

interface Interface {
	row?: ItemData
}

function RibbonRender({ row }: Interface) {
	const { daysLeftForAutoIrnGeneration = '', invoiceAdditionals = {} } = row || {};
	const { reqCancelReason = '' } = invoiceAdditionals || {};
	let value;
	if ((daysLeftForAutoIrnGeneration as unknown as number) >= 0) {
		value = `${daysLeftForAutoIrnGeneration || '--'} days left` || '0';
	} else {
		value = 'Expired';
	}

	return (
		<div>
			{daysLeftForAutoIrnGeneration ? (
				<div
					className={styles.ribbon}
					style={{
						background: (daysLeftForAutoIrnGeneration as unknown as number) >= 0
							? 'rgb(255, 213, 85)' : '#ff0000',
					}}
				>
					{value || '-'}
					{' '}
				</div>
			) : null}
			{reqCancelReason
				? (
					<div
						className={styles.ribbon}
						style={{
							background: 'rgb(255, 213, 85)',
						}}
					>
						Cancel Approved
						{' '}
					</div>
				)
				: null}
		</div>
	);
}

export default RibbonRender;
