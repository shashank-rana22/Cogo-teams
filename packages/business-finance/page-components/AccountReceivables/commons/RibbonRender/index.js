import React from 'react';

import styles from './styles.module.css';

interface InvoiceAdditionals {
	reqCancelReason?: string,
	reqReplaceTo?:string,
	reqReplaceReason?:string,
}

interface ItemData {
	daysLeftForAutoIrnGeneration?: string,
	invoiceAdditionals?: InvoiceAdditionals
}

interface Interface {
	row?: ItemData
}

function RibbonRender({ row = {} }: Interface) {
	const { daysLeftForAutoIrnGeneration = '', invoiceAdditionals = {} } = row;
	const { reqCancelReason = '', reqReplaceTo = '', reqReplaceReason = '' } = invoiceAdditionals || {};

	let value;
	if ((daysLeftForAutoIrnGeneration as unknown as number) >= 0) {
		value = `${daysLeftForAutoIrnGeneration || '--'} days left` || '0';
	} else {
		value = 'Expired';
	}
	const properties = [
		{
			param      : daysLeftForAutoIrnGeneration,
			displayVal : value || '-',
			criteria   : (daysLeftForAutoIrnGeneration as unknown as number) >= 0,
		},
		{ param: reqCancelReason, displayVal: 'Cancel Approved', criteria: true },
		{ param: reqReplaceReason && reqReplaceTo, displayVal: `Replace to ${reqReplaceTo}`, criteria: true },
	];

	return (
		<div>
			{
				properties.map((item) => {
					const { param, displayVal, criteria } = item;

					return (
						param
							? (
								<div
									className={styles.ribbon}
									style={{ background: criteria ? '#ffd555' : '#ff0000' }}
									key={param}
								>
									{displayVal}
								</div>
							)
							: null
					);
				})
			}
		</div>
	);
}

export default RibbonRender;
