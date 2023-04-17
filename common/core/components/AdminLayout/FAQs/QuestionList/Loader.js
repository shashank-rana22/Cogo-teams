import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Loader({ topic = {} }) {
	const DATA = ['Do you know that you can pay up to 90 days after for shipment booked using Pay Later?',
		'Do you possess knowledge of the numerous surcharges that could potentially modify the freight rate unexpectedly at the eleventh hour?',
		'Know the power of the tools at your disposal on Sales CRM',
		'Know about the CogoAssured service which guarantees competitive freight rates and confirmed space and inventory in high-demand routes',
		'Are you aware of the various SaaS tools such as HS code finder, Quick Quotation, Duty and Tax Calculator?',
		'Wondering about the different terms of trade for the sale of goods all around the world. Get detailed knowledge about the Incoterms here.',
		'Save time and hassle with our RFQ and Contract feature. Get fast and easy quotes from reliable logistics providers and lock in your contract.',
		'Track your shipments in real-time with our advanced Tracking tool. Know exactly where your shipment is at all times.',
		'Are you feeling overwhelmed by the numerous export documents? Gain a comprehensive understanding of each necessary document by referring to our detailed export checklist available here.',
		'Do you know about the different Payment terms such as Prepaid, Collect etc?'];
	return (
		<div className={styles.container}>
			<div className={styles.topic_heading}>
				Topic:
				{' '}
				{startCase(topic.display_name) || 'Search Result'}
			</div>

			<div className={styles.loopWrapper}>
				<div className={styles.mountain} />
				<div className={styles.hill} />
				<div className={styles.tree} />
				<div className={styles.rock} />
				<div className={styles.truck} />
			</div>
			<p className={styles.line}>
				{DATA[Math.floor(Math.random() * 10)]}
			</p>
		</div>
	);
}

export default Loader;
