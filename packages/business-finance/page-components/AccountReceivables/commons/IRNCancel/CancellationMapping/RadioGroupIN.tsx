import { Textarea, Button, RadioGroup, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import { IRN_CANCEL_OPTIONS } from '../../../constants';
import useGetIrnCancellation from '../../../hooks/useGetIrnCancellation';
import styles from '../styles.module.css';

function RadioGroupIN({
	itemData,
	showCancellationModal,
	setShowCancellationModal,
	refetch,
	entityCode,
}) {
	const [response, setResponse] = useState({
		value   : '',
		remarks : '',
	});

	const { onSubmit, loading } = useGetIrnCancellation({
		id: itemData?.id,
		setShowCancellationModal,
		refetch,
		entityCode,
	});

	return (
		<Modal show={showCancellationModal} onClose={() => setShowCancellationModal(false)} size="md">
			<div className={styles.cancel_modal}>

				<Modal.Header
					title={(
						<div className={styles.cancel_invoice}>
							Cancel IRN Of Invoice Number
							{' '}
							<span className={styles.styled_invoice}>
								{itemData?.invoiceNumber}
							</span>
						</div>
					)}
				/>

				<Modal.Body>

					<div className={styles.Radiodiv}>
						<div className={styles.styled_reason}>
							Reason
						</div>

						<RadioGroup
							options={IRN_CANCEL_OPTIONS}
							value={response?.value}
							onChange={(e) => {
								setResponse((r) => ({ ...r, value: e }));
							}}
						/>
					</div>
					<div>
						<div className={styles.styled_remarks}>
							Remarks
						</div>
						<Textarea
							value={response?.remarks}
							onChange={(e) => {
								setResponse((r) => ({ ...r, remarks: e }));
							}}
							placeholder="Not more than 100 characters"
						/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.confirm_button}>
						<div className={styles.styled_button}>
							<Button
								onClick={() => {
									onSubmit(response);
								}}
								disabled={
							response.value === '' || response.remarks === '' || loading
						}
							>
								Confirm
							</Button>
						</div>
						<Button
							onClick={() => {
								setShowCancellationModal(false);
							}}
						>
							Cancel
						</Button>
					</div>
				</Modal.Footer>
			</div>
		</Modal>
	);
}

export default RadioGroupIN;
