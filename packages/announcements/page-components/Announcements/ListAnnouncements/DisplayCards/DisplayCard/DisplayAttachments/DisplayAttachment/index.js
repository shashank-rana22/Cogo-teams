/* eslint-disable no-undef */
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AddModal from './AddModal';
import { getElementController } from './getElementController';
import styles from './styles.module.css';

function DisplayAttachment(
	{
		data = {},
		name,
		index,
		deleteAttachment = () => {},
		editAttachment = () => {},
		addAttachment = () => {},
		openDocument = () => {},
		announcement_id,
		isValid,
	},
) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const [showEditModal, setShowEditModal] = useState(null);
	const [showAddModal, setShowAddModal] = useState(null);

	const { control, setValue, handleSubmit, formState:{ errors }, watch } = useForm();

	const fa = watch();
	const URL_ERROR_MAPPING = {
		pdf   : errors?.pdf?.message,
		image : errors?.image?.message,
		video : errors?.video?.message,
	};

	const URL_MAPPING = {
		pdf   : fa?.pdf,
		image : fa?.image,
		video : fa?.video,
	};

	const renderEditModal = (value) => {
		const Element = getElementController(value?.document_type);
		console.log(value);
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
								accept={value?.document_type === 'image' ? '.png, .jpeg' : '.pdf'}
							/>
							{console.log(errors)}
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
							/>
							{console.log(errors)}
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

	const addFunction = () => {
		const url = URL_MAPPING[name];
		addAttachment(announcement_id, url, name, index);
		setShowAddModal(null);
	};

	const editFunction = () => {
		const url = URL_MAPPING[name];
		console.log('data', fa);
		editAttachment(showEditModal, url, index);
		setShowEditModal(null);
	};

	const deleteFunction = (id) => {
		deleteAttachment(id, index);
		setShowDeleteModal(null);
	};

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					Media Type :&nbsp;
					{name}
				</div>

				{isValid!==-1 && (
					<Button size="sm" themeType="secondary" onClick={() => setShowAddModal(name)}>
					Add
					{' '}
					{name}
					</Button>
				)}
			</div>
			<div className={styles.map_container}>
				{data
					? data.map((item) => (
						<div className={styles.data_container}>
							<div className={styles.data_display}>
								<span className={styles.name_data}>{item?.document_url}</span>
							</div>

							<div className={styles.buttoncontainer}>
								<Button
									themeType="primary"
									size="sm"
									style={{ marginRight: 8 }}
									onClick={() => openDocument(item?.document_url)}
								>
									View
								</Button>
							{isValid!==-1 && (
								<>
									<Button
									themeType="secondary"
									size="sm"
									style={{ marginRight: 8 }}
									onClick={() => setShowEditModal(item)}
								>
									Edit
								</Button>
								<IcMDelete
									height={20}
									width={20}
									style={{ cursor: 'pointer' }}
									onClick={() => setShowDeleteModal(item)}
								/>
								</>
							)}
							</div>

						</div>
					))
					: <div className={styles.nodisplay}> No Data </div>}

				{!isEmpty(showDeleteModal) && (
					<Modal
						show={showDeleteModal}
						scroll={false}
						size="md"
						placement="center"
						onClose={() => setShowDeleteModal(null)}
					>
						<Modal.Header title="Are you sure you want to Delete this announcement" />
						<Modal.Footer>
							<div className={styles.delete_buttons}>
								<Button
									themeType="secondary"
									size="md"
									onClick={() => setShowDeleteModal(null)}
									style={{ marginRight: '20px' }}
								>
									Cancel
								</Button>
								<Button
									themeType="primary"
									size="md"
									onClick={() => deleteFunction(showDeleteModal?.id)}
								>
									Delete
								</Button>
							</div>
						</Modal.Footer>
					</Modal>
				)}

				{!isEmpty(showEditModal) ? (
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
							<div className={styles.delete_buttons}>
								<Button
									themeType="secondary"
									size="md"
									onClick={() => setShowEditModal(null)}
									style={{ marginRight: '20px' }}
								>
									Cancel
								</Button>
								<Button
									themeType="primary"
									size="md"
									onClick={handleSubmit(editFunction)}
								>
									Update
								</Button>
							</div>
						</Modal.Footer>
					</Modal>
				) : null}

				{!isEmpty(showAddModal) ? (
					<AddModal
						setShowAddModal={setShowAddModal}
						showAddModal={showAddModal}
						setValue={setValue}
						control={control}
						errors={errors}
						addFunction={addFunction}
						handleSubmit={handleSubmit}
					/>
				)
					: null}

			</div>
		</div>
	);
}

export default DisplayAttachment;
