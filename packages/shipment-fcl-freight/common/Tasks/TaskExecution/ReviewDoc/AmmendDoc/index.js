import { Button, Textarea, Toast } from '@cogoport/components';
import { useState } from 'react';

import useUpdateShipmentDocuments from '../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';
import UpdateQuotation from './UpdateQuotation';

function AmmendDoc({ task = {}, onClose = () => {}, newRefetch = () => {} }) {
	const isApproveBookingNote = task?.task === 'approve_booking_note';

	const [remarkValue, setRemarkValue] = useState('');
	const [isQuotation, setIsQuotation] = useState(isApproveBookingNote);

	const { taskUpdateLoading, updateDocument } = useUpdateShipmentDocuments(
		{ refetch: newRefetch },
	);

	const handleRemarkSubmit = async () => {
		if (!remarkValue) {
			Toast.error('Please provide amendment reason');
		}

		const params = {
			state   : 'document_amendment_requested',
			remarks : [remarkValue],
		};

		await updateDocument(params);
	};

	if (isQuotation) {
		return (
			<UpdateQuotation
				task={task}
				setIsQuotation={setIsQuotation}
				onClose={onClose}
			/>
		);
	}

	return (
		<>
			<div className={styles.remark}>
				<div className={styles.sub_heading}>Please specify the reason for this </div>
				<Textarea
					className="remark_text"
					value={remarkValue}
					onChange={(e) => setRemarkValue(e)}
					placeholder="Type Remarks"
				/>
			</div>

			<div className={styles.action_buttons}>
				{isApproveBookingNote ? (
					<Button
						onClick={() => {
							setIsQuotation(true);
						}}
						themeType="secondary"
						disabled={taskUpdateLoading}
					>
						Back
					</Button>

				) : (
					<Button
						onClick={() => {
							onClose();
						}}
						themeType="secondary"
						disabled={taskUpdateLoading}
					>
						Cancel
					</Button>
				)}

				<Button
					onClick={() => {
						handleRemarkSubmit();
					}}
					disabled={taskUpdateLoading}
				>
					Submit
				</Button>
			</div>
		</>
	);
}

export default AmmendDoc;
