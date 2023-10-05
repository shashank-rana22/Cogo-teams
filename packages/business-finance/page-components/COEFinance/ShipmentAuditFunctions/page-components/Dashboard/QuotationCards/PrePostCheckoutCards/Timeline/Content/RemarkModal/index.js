import { Button, Modal, Textarea } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

// const LAST_INDEX = 5;
// const NEXT_INDEX = 1;

export default function RemarkModal({
	remarkValue,
	setRemarkValue,
	queryModalShow,
	setQueryModalShow,
	buttonClicked,
	setButtonClicked,
	// columnIndex,
	// index,
	toggleAccordion,
	currentKey,
	nextKey,

}) {
	function onClose() {
		setQueryModalShow(false);
		setRemarkValue('');
		setButtonClicked('');
	}
	function handleRaiseQuery() {
		// toggleAccordion(columnIndex, index);
		// if (index !== LAST_INDEX) {
		// 	toggleAccordion(columnIndex, index + NEXT_INDEX);
		// }
		toggleAccordion(currentKey);
		if (nextKey !== '') toggleAccordion(nextKey);
		setQueryModalShow(false);
	}
	function handleSubmit() {
		toggleAccordion(currentKey);
		if (nextKey !== '') toggleAccordion(nextKey);
		setQueryModalShow(false);
	}
	return (
		<Modal
			size="md"
			show={queryModalShow}
			onClose={() => onClose()}
			onOuterClick={() => onClose()}
			placement="center"
			scroll
		>
			<Modal.Header title="RAISE QUERY" />
			<Modal.Body>
				{buttonClicked === 'Query' ? (
					<div className={styles.modify}>
						Query
					</div>
				) : (
					<div className={styles.modify}>
						Accept
					</div>
				)}
				<Textarea
					name="remark"
					size="md"
					rows={4}
					cols={20}
					placeholder="Enter Remarks..."
					onChange={(e) => setRemarkValue(e)}
					value={remarkValue}
					maxLength="150"
				/>
				<div className={styles.max_words}>
					MAX. WORDS 150
				</div>
			</Modal.Body>
			<Modal.Footer>
				{buttonClicked === 'Query' ? (
					<Button
						size="md"
						themeType="primary"
						onClick={() => { handleRaiseQuery(); }}
					>
						Submit
					</Button>
				) : (
					<Button
						size="md"
						themeType="primary"
						onClick={() => { handleSubmit(); }}
					>
						Approve
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
