import React, { useState } from 'react';
import { Select, Button, TextArea, Modal } from '@cogoport/components';
import updateTag from '../../../../hook/useUpdateTag';
import { urgencyOptions } from '../controls';
import styles from './styles.module.css';

const AddUrgencyTag = ({
	billId = '',
	showAddTag = false,
	serviceType = '',
	setShowAddTag = () => {},
	getBillRefetch = () => {},
	collectionPartyId = '',
}) => {
	const [tagValue, setTagValue] = useState('');
	const [remarks, setRemarks] = useState('');

	if (serviceType === 'air_freight') {
		urgencyOptions.push({ label: 'Airlines DO Payments', value: 'air_do' });
	}

	const onClose = () => {
		setShowAddTag(false);
		getBillRefetch();
	};

	const { loading, handleSubmit } = updateTag({
		onClose,
		billId,
		tagValue,
		collectionPartyId,
		remarks,
	});

	return (
		<Modal show={showAddTag} onClose={onClose}>
			<div className={styles.subContainer} >
				<div className={styles.heading}>Urgency Tag</div>

				<Select
					className="primary lg"
					placeholder="Select the urgency Tag"
					value={tagValue}
					onChange={(e) => setTagValue(e)}
					options={urgencyOptions}
				/>

				{tagValue === 'urgent' ? (
					<TextArea
						value={remarks}
						onChange={(e) => setRemarks(e.target?.value)}
						placeholder="Enter Urgent Remarks..."
					/>
				) : null}
			</div>

			<div className={styles.buttonContainer}>
				<Button
				    className={styles.cancelbtn}
					themeType="secondary md"
					onClick={() => setShowAddTag(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					onClick={handleSubmit}
					disabled={loading}
				>
					Submit
				</Button>
			</div>
		</Modal>
	);
};

export default AddUrgencyTag;
