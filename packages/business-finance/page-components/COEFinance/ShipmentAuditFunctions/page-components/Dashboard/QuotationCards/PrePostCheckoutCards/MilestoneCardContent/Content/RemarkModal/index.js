import { Button, Modal, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useApproveQuotation from '../../../../../../../../hook/useApproveQuotation';

import styles from './styles.module.css';

export default function RemarkModal({
	remarkValue = '',
	setRemarkValue = () => {},
	queryModalShow = false,
	setQueryModalShow = () => {},
	buttonClicked = '',
	setButtonClicked = () => {},
	toggleAccordion = () => {},
	currentKey = '',
	nextKey = '',
	item = {},
	getPrePostShipmentQuotes = () => {},

}) {
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
			<Modal.Header title={buttonClicked === 'Query' ? 'RAISE TICKET' : 'APPROVE'} />
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
						disabled={isEmpty(remarkValue)}
					>
						Approve
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
