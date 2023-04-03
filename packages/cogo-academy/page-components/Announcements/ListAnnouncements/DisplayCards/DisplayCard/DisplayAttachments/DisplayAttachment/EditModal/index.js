import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { getElementController } from '../getElementController';

import styles from './styles.module.css';

function EditModal({
	setShowEditModal,
	showEditModal,
	loading = false,
	editAttachment = () => {},
	name,
	index,
}) {
	const { control, handleSubmit, formState:{ errors }, watch } = useForm();

	const elementInput = watch();

	const URL_MAPPING = {
		pdf   : elementInput?.pdf,
		image : elementInput?.image,
		video : elementInput?.video,
	};

	const URL_ERROR_MAPPING = {
		pdf   : errors?.pdf?.message,
		image : errors?.image?.message,
		video : errors?.video?.message,
	};
	const editFunction = () => {
		let url = URL_MAPPING[name];
		url = (url?.finalUrl ? url?.finalUrl : url);
		editAttachment(showEditModal, url, index);
		setShowEditModal(null);
	};

	const renderEditModal = (value) => {
		const Element = getElementController(value?.document_type);

		if (!Element) return null;
		return (
			<div>
				<Element
					key={value?.id}
					name={value?.document_type}
					control={control}
					value={value?.document_type === 'video' ? value?.document_url : null}
					defaultValues={value?.document_type !== 'video' ? value?.document_url : null}
					accept={value?.document_type === 'image' ? '.png, .jpeg' : '.pdf'}
					placeholder="Enter Video URL"
					rules={{ required: 'Input Value Required' }}
				/>
				{URL_ERROR_MAPPING[value?.document_type] && (
					<div className={styles.errors}>
						{URL_ERROR_MAPPING[value?.document_type]}
						<span>*</span>
					</div>
				)}
			</div>
		);
	};

	return (
		<Modal
			show={showEditModal}
			scroll={false}
			size="md"
			placement="center"
			onClose={() => setShowEditModal(null)}
		>
			<Modal.Header title="Are you sure you want to Edit this attachment" />
			<Modal.Body>
				{renderEditModal(showEditModal)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.update_buttons}>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						disabled={loading}
						onClick={() => setShowEditModal(null)}
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						type="button"
						themeType="primary"
						size="md"
						loading={loading}
						onClick={handleSubmit(editFunction)}
					>
						Update
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default EditModal;
