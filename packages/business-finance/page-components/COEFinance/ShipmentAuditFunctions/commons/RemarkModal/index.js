import { Button, Modal, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useApproveQuotation from '../../../hook/useApproveQuotation';

import styles from './styles.module.css';

export default function RemarkModal({
	remarkValue = '',
	setRemarkValue = () => {},
	queryModalShow = false,
	setQueryModalShow = () => {},
	buttonClicked = '',
	setButtonClicked = () => {},
	id = '',
	getClosedTasks = () => {},

}) {
	const onClose = () => {
		setQueryModalShow(false);
		setRemarkValue('');
		setButtonClicked('');
	};

	const {
		approveQuotationLoading = false,
		approveQuotation = () => {},
	} = useApproveQuotation({ id, remarks: remarkValue, status: 'APPROVED' });

	const handleSubmit = () => {
		approveQuotation(onClose, getClosedTasks);
	};

	return (
		<Modal
			size="md"
			show={approveQuotationLoading || queryModalShow}
			onClose={onClose}
			onOuterClick={onClose}
			placement="center"
			scroll
		>
			<Modal.Header title="ACCEPT" />
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
					>
						Submit
					</Button>
				) : (
					<Button
						size="md"
						themeType="primary"
						onClick={handleSubmit}
						disabled={isEmpty(remarkValue)}
					>
						Approve
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
