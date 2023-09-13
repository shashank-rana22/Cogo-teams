import { Button } from '@cogoport/components';
import React, { useState, useMemo } from 'react';

import Accordian from './Accordian';
import styles from './styles.module.css';

const DEFAULT_MIN_VALUE = 0;

function InvoiceBLCheck({ setActive = () => {}, bLData = {} }) {
	const [isOpen, setIsOpen] = useState(null);
	const [showCheckInvoices, setShowCheckInvoices] = useState({});

	const { list = [] } = bLData || {};

	const {
		TAGGED_DATA = [],
		REJECTED_DATA = [],
		PENDING_DATA = [],
	} = useMemo(() => {
		const TAGGED = [];
		const REJECTED = [];
		const PENDING = [];

		(list || [])?.forEach((item) => {
			const { payrunBillStatus, id } = item || {};
			const value = showCheckInvoices[id] || '';

			if (payrunBillStatus === 'APPROVED' || value === 'Tagged') {
				TAGGED.push('Tagged');
			} else if (payrunBillStatus === 'REJECTED' || value === 'Reject') {
				REJECTED.push('Reject');
			} else {
				PENDING.push('Pending');
			}
		});

		return {
			TAGGED_DATA   : TAGGED,
			REJECTED_DATA : REJECTED,
			PENDING_DATA  : PENDING,
		};
	}, [list, showCheckInvoices]);

	return (
		<div>
			<div>
				<span className={styles.heading_1}>Match Invoice - MBL/HBL</span>
				<span className={styles.heading_2}>( Tag A Document To Each Invoice )</span>
			</div>

			<div className={styles.stats_container}>
				<div className={styles.stat}>
					Pending
					{' '}
					<span className={styles.pending}>
						{PENDING_DATA?.length || DEFAULT_MIN_VALUE}
					</span>
				</div>

				<div className={styles.stat}>
					Tagged
					{' '}
					<span className={styles.tagged}>
						{TAGGED_DATA.length || DEFAULT_MIN_VALUE}
					</span>
				</div>

				<div className={styles.stat}>
					Rejected
					{' '}
					<span className={styles.rejected}>
						{REJECTED_DATA.length || DEFAULT_MIN_VALUE}
					</span>
				</div>
			</div>

			<div className={styles.accordians}>
				{
				(list || []).map((item) => (
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
				<Button
					size="md"
					className={styles.btn_1}
					onClick={() => {
						setActive('merge_documents');
					}}
					disabled={
							!(list?.length === TAGGED_DATA.length + REJECTED_DATA.length)
						}
				>
					Save & Proceed
				</Button>
			</div>
		</div>
	);
}

export default InvoiceBLCheck;
