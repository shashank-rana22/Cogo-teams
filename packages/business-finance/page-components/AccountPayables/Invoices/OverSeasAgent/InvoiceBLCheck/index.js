import { Button } from '@cogoport/components';
import React, { useState, useMemo } from 'react';

import Accordian from './Accordian';
import styles from './styles.module.css';

const DEFAULT_MIN_VALUE = 0;
const MAX_ARRAY_LENGTH_MINUS = 1;

function InvoiceBLCheck({ setActive = () => {}, bLData = {} }) {
	const [isOpen, setIsOpen] = useState(null);
	const [showCheckInvoices, setShowCheckInvoices] = useState({});

	const { list = [] } = bLData || {};

	const memoizedFunction = useMemo(() => {
		const TAGGED_DATA = [];
		const REJECTED_DATA = [];
		const PENDING_DATA = [];
		const ID_DATA = [];

		(list || []).forEach((item) => {
			const status = showCheckInvoices?.[item?.id];

			if (status === 'Tagged') {
				TAGGED_DATA.push('Tagged');
			} else if (status === 'Reject') {
				REJECTED_DATA.push('Reject');
			} else {
				PENDING_DATA.push('Pending');
			}

			if (item?.payrunBillStatus === 'INITIATED') {
				ID_DATA.push(item?.id);
			}
		});

		return {
			TAGGED_DATA,
			REJECTED_DATA,
			PENDING_DATA,
			ID_DATA,
		};
	}, [list, showCheckInvoices]);

	const {
		TAGGED_DATA = [],
		REJECTED_DATA = [],
		PENDING_DATA = [],
	} = memoizedFunction;

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
						{PENDING_DATA[PENDING_DATA.length - MAX_ARRAY_LENGTH_MINUS]?.length || DEFAULT_MIN_VALUE}
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
