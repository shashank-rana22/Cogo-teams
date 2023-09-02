import { Button, CheckboxGroup, Input, Modal } from '@cogoport/components';
import React, { useRef } from 'react';

import { CLOSE_REASON_OPTIONS } from '../../../../helpers/constants';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';

import styles from './styles.module.css';

function CloseModal({
	setShowModal = () => {},
	showModal = true,
	data = {},
	getListCoverage = () => {},
	filter = {},
}) {
	const inputRef = useRef(null);
	const {
		loading,
		deleteRateJob,
		checkboxValue,
		setCheckboxValue,
	} = useDeleteRateJob({ service: filter?.service, data });

	const handleSubmit = async () => {
		const otherReason = inputRef?.current?.value;
		await deleteRateJob(otherReason);
		setShowModal(false);
		getListCoverage();
	};
	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="lg">
			<Modal.Header title="Please select reason for closing" />
			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
				<p className={styles.bold_text} style={{ marginLeft: '20px' }}>Reasons</p>
				<CheckboxGroup
					options={CLOSE_REASON_OPTIONS}
					onChange={setCheckboxValue}
					value={checkboxValue}
					style={{ display: 'flex', flexDirection: 'column' }}
				/>
				{checkboxValue.includes('other') && (
					<div className={styles.col}>
						<p className={styles.bold_text}>Other Reason</p>
						<Input ref={inputRef} />
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button
						onClick={handleSubmit}
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CloseModal;
