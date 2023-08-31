import { Badge, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Accordian from './Accordian';
import styles from './styles.module.css';

const DEFAULT_MIN_VALUE = 0;
const MAX_ARRAY_LENGTH_MINUS = 1;

function InvoiceBLCheck({ setActive = () => {}, bLData = {} }) {
	const [isOpen, setIsOpen] = useState(null);
	const [showCheckInvoices, setShowCheckInvoices] = useState({});

	const { list = [] } = bLData || {};

	const TAGGEG_DATA = [];
	const REJECTED_DATA = [];
	const PENDING_DATA = [];
	const ID_DATA = [];

	Object.values(showCheckInvoices).forEach((item) => {
		if (item === 'Tagged') {
			TAGGEG_DATA.push(item);
		} else if (item === 'Reject') {
			REJECTED_DATA.push(item);
		}
	});

	list.forEach((item) => {
		if (showCheckInvoices && item?.payrunBillStatus === 'INITIATED') {
			ID_DATA.push(item?.id);
			const Data = Object.keys(showCheckInvoices);
			const difference = ID_DATA.filter((x) => !Data.includes(x));
			PENDING_DATA.push(difference);
		} else if (item?.payrunBillStatus === 'APPROVED') {
			TAGGEG_DATA.push('Tagged');
		} else if (item?.payrunBillStatus === 'REJECTED') {
			REJECTED_DATA.push('Reject');
		} else if (
			item?.payrunBillStatus !== 'APPROVED'
			|| item?.payrunBillStatus !== 'REJECTED'
		) {
			PENDING_DATA.push('Pending');
		}
	});

	return (
		<div>
			<div>
				<span className={styles.heading_1}>Match Invoice - MBL/HBL</span>
				<span className={styles.heading_2}>( Tag A Document To Each Invoice )</span>
			</div>

			<div className={styles.stats_container}>
				<div className={styles.stat}>
					<Badge
						placement="right"
						color="yellow"
						size="md"
						text={PENDING_DATA[PENDING_DATA.length - MAX_ARRAY_LENGTH_MINUS]?.length || DEFAULT_MIN_VALUE}
					>
						Pending
					</Badge>
				</div>

				<div className={styles.stat}>
					<Badge
						placement="right"
						color="green"
						size="md"
						text={TAGGEG_DATA.length || DEFAULT_MIN_VALUE}
					>
						Tagged
					</Badge>
				</div>

				<div className={styles.stat}>
					<Badge
						placement="right"
						color="red"
						size="md"
						text={REJECTED_DATA.length || DEFAULT_MIN_VALUE}
					>
						Rejected
					</Badge>
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
						disabled={
							!(list.length === TAGGEG_DATA.length + REJECTED_DATA.length)
						}
					>
						Save & Proceed
					</Button>
				</div>
			</div>
		</div>
	);
}

export default InvoiceBLCheck;
