import { Button, Modal } from '@cogoport/components';
import React, { useEffect } from 'react';

import { getElementController } from '../getElementController';

import styles from './styles.module.css';

function AddModal({
	setShowAddModal,
	showAddModal,
	handleSubmit,
	addFunction = () => {},
	setValue,
	control,
	errors,
}) {
	const URL_ERROR_MAPPING = {
		pdf   : errors?.pdf?.message,
		image : errors?.image?.message,
		video : errors?.video?.message,
	};

	const renderAddModal = (value) => {
		const Element = getElementController(value);
		console.log('add', value);
		return (
			<div>
				<Element
					name={value}
					control={control}
					placeholder="Enter Video URL"
					accept={value === 'image' ? '.png, .jpeg' : '.pdf'}
					rules={{ required: 'Input Value Required' }}
				/>
				{URL_ERROR_MAPPING[value] && (
					<div className={styles.errors}>
						{URL_ERROR_MAPPING[value]}
						<span>*</span>
					</div>
				)}
			</div>
		);
	};
	useEffect(() => {
		if (showAddModal) {
			setValue(`${showAddModal?.document_type}`, '');
		}
	}, []);

	return (
		<Modal
			show={showAddModal}
			scroll={false}
			size="md"
			placement="center"
			onClose={() => setShowAddModal(null)}
		>
			<Modal.Header title="Are you sure you want to Add this announcement" />
			<Modal.Body>
				{renderAddModal(showAddModal)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.delete_buttons}>
					<Button
						themeType="secondary"
						size="md"
						onClick={() => setShowAddModal(null)}
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						themeType="primary"
						size="md"
						onClick={handleSubmit(addFunction)}
					>
						Add
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default AddModal;
