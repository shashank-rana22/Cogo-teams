import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { getElementController } from '../getElementController';

import styles from './styles.module.css';

function AddModal({
	setShowAddModal,
	showAddModal,
	loading = false,
	addAttachment = () => {},
	name,
	index,
	announcement_id,
}) {
	const { control, handleSubmit, formState:{ errors }, watch } = useForm();

	const URL_ERROR_MAPPING = {
		pdf   : errors?.pdf?.message,
		image : errors?.image?.message,
		video : errors?.video?.message,
	};
	const elementInput = watch();

	const URL_MAPPING = {
		pdf   : elementInput?.pdf,
		image : elementInput?.image,
		video : elementInput?.video,
	};
	const addFunction = () => {
		const url = URL_MAPPING[name];
		addAttachment(announcement_id, url, name, index);
		setShowAddModal(null);
	};

	const renderAddModal = (value) => {
		const Element = getElementController(value);
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

	return (
		<Modal
			show={showAddModal}
			scroll={false}
			size="md"
			placement="center"
			onClose={() => setShowAddModal(null)}
		>
			<Modal.Header title="Are you sure you want to Add this attachment" />
			<Modal.Body>
				{renderAddModal(showAddModal)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.add_buttons}>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						disabled={loading}
						onClick={() => setShowAddModal(null)}
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						type="button"
						themeType="primary"
						size="md"
						loading={loading}
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
