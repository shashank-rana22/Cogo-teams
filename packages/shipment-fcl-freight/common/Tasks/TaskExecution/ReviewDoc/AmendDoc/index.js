import { Button, Textarea, Toast } from '@cogoport/components';
import { useState } from 'react';

import useUpdateShipmentDocuments from '../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

function AmendDoc({
	params = {},
	onClose = () => {},
	newRefetch = () => {},
}) {
	const [remarkValue, setRemarkValue] = useState('');

	const { taskUpdateLoading = false, updateDocument = () => {} } = useUpdateShipmentDocuments(
		{ refetch: newRefetch },
	);

	const handleRemarkSubmit = async () => {
		if (!remarkValue) {
			Toast.error('Please provide amendment reason');
		}

		const amendParams = {
			...params,
			state   : 'document_amendment_requested',
			remarks : [remarkValue],
		};

		await updateDocument(amendParams);
	};

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
				<Button
					onClick={() => {
						onClose();
					}}
					themeType="secondary"
					disabled={taskUpdateLoading}
				>
					Cancel
				</Button>

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

export default AmendDoc;
