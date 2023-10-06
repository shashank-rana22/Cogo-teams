import { Button, Modal, Textarea } from '@cogoport/components';
import React from 'react';

import useApproveQuotation from '../../../../../../../../hook/useApproveQuotation';

import styles from './styles.module.css';

// const LAST_INDEX = 5;
// const NEXT_INDEX = 1;
const ZERO_VAL = 0;

export default function RemarkModal({
	remarkValue = '',
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
	item,
	getPrePostShipmentQuotes,

}) {
	// console.log({ remarkValue });
	function onClose() {
		setQueryModalShow(false);
		setRemarkValue('');
		setButtonClicked('');
	}
	function handleRaiseQuery() {
		toggleAccordion(currentKey);
		if (nextKey !== '') toggleAccordion(nextKey);
		setQueryModalShow(false);
	}
	function handleSubmit() {
		toggleAccordion(currentKey);
		if (nextKey !== '') toggleAccordion(nextKey);
		setQueryModalShow(false);
	}
	const { approveQuotation, approveQuotationLoading } = useApproveQuotation(
		{
			id      : item?.id,
			status  : 'APPROVED',
			remarks : remarkValue,
		},
	);
	return (
		<Modal
			size="md"
			show={approveQuotationLoading || queryModalShow}
			onClose={() => onClose()}
			onOuterClick={() => onClose()}
			placement="center"
			scroll
		>
			<Modal.Header title={buttonClicked === 'Query' ? 'RAISE QUERY' : 'APPROVE'} />
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
						onClick={() => {
							approveQuotation(handleRaiseQuery, getPrePostShipmentQuotes);
						}}
					>
						Submit
					</Button>
				) : (
					<Button
						size="md"
						themeType="primary"
						onClick={() => {
							approveQuotation(handleSubmit, getPrePostShipmentQuotes);
						}}
						disabled={remarkValue.length === ZERO_VAL}
					>
						Approve
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
