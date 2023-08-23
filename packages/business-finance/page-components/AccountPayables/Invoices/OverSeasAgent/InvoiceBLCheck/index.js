import { Badge, Button } from '@cogoport/components';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Accordian from './Accordian';
import styles from './styles.module.css';

function InvoiceBLCheck({ setActive, bLData = {} }) {
	// const { query } = useRouter();
	// const { services } = query;
	const [isOpen, setIsOpen] = useState(null);
	const [showCheckInvoices, setShowCheckInvoices] = useState({});

	const { list = [] } = bLData || {};

	return (
		<div>
			<div>
				<span className={styles.heading_1}>Match Invoice - MBL/HBL</span>
				<span className={styles.heading_2}>( Tag A Document To Each Invoice )</span>
			</div>

			<div className={styles.stats_container}>
				<div className={styles.stat}>
					<Badge placement="right" color="yellow" size="md" text="5">Pending</Badge>
				</div>
				<div className={styles.stat}>
					<Badge placement="right" color="green" size="md" text="3">Tagged</Badge>
				</div>
				<div className={styles.stat}>
					<Badge placement="right" color="red" size="md" text="2">Rejected</Badge>
				</div>
			</div>

			<div className={styles.accordians}>
				{
				list.map((item) => (
					<Accordian
						key={item.id}
						itemData={item}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						showCheckInvoices={showCheckInvoices}
						setShowCheckInvoices={setShowCheckInvoices}
					/>
				))
			}
			</div>
			<div className={styles.btn_container}>
				<div className={styles.btn_1}>
					<Button
						size="md"
						onClick={() => {
							setActive('merge_documents');
						}}
					>
						Save & Proceed
					</Button>
				</div>
			</div>
		</div>
	);
}

export default InvoiceBLCheck;
