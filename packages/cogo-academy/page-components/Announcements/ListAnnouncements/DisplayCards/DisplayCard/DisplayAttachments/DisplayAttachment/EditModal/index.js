import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { getElementController } from '../getElementController';

import styles from './styles.module.css';

function EditModal({
	setShowEditModal,
	showEditModal,
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
		return (
			<div>
				{value?.document_type === 'video'
					? (
						<>
							<Element
								key={value?.id}
								name={value?.document_type}
								control={control}
								value={value?.document_url}
								placeholder="Enter Video URL"
								rules={{ required: 'Input Value Required' }}
							/>
							{URL_ERROR_MAPPING[value?.document_type] && (
								<div className={styles.errors}>
									{URL_ERROR_MAPPING[value?.document_type]}
									<span>*</span>
								</div>
							)}
						</>
					)
					:	(
						<>
							<Element
								key={value?.id}
								name={value?.document_type}
								control={control}
								defaultValues={value?.document_url}
								accept={value?.document_type === 'image' ? '.png, .jpeg' : '.pdf'}
								rules={{ required: 'Input Value Required' }}
							/>
							{URL_ERROR_MAPPING[value?.document_type] && (
								<div className={styles.errors}>
									{URL_ERROR_MAPPING[value?.document_type]}
									<span>*</span>
								</div>
							)}
						</>
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
			<Modal.Header title="Are you sure you want to Edit this announcement" />
			<Modal.Body>
				{renderEditModal(showEditModal)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.update_buttons}>
					<Button
						type="button"
						themeType="secondary"
						size="md"
						onClick={() => setShowEditModal(null)}
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						button="type"
						themeType="primary"
						size="md"
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
