/* eslint-disable no-undef */
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

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
		announcement_id,
	},
) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const [showEditModal, setShowEditModal] = useState(null);
	const [showAddModal, setShowAddModal] = useState(null);
	const openDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}
		window.open(modifiedUrl, '_blank');
	};
	const { control, setValue, handleSubmit, watch } = useForm();

	const fa = watch();
	// console.log('watch', fa);

	console.log('data', data);
	const renderEditModal = (value) => {
		const Element = getElementController(value?.document_type);

		return (
			<div>
				<Element
					key={value?.id}
					name={value?.document_type}
					control={control}
					placeholder="Enter Video URL"
					accept={value?.document_type === 'image' ? '.png, .jpeg' : '.pdf'}
				/>
			</div>
		);
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
				/>
			</div>
		);
	};
	const URL_MAPPING = {
		pdf   : fa?.pdf,
		image : fa?.image,
		video : fa?.video,
	};

	const addFunction = (type) => {
		const url = URL_MAPPING[type];
		console.log(type);
		addAttachment(announcement_id, url, type, index);
		setShowAddModal(null);
	};

	const editFunction = (values, type) => {
		const url = URL_MAPPING[type];
		editAttachment(values, url, index);
		setShowEditModal(null);
	};
	return (
		<div className={styles.container}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					Media Type :&nbsp;
					{name}
				</div>

				<Button size="sm" themeType="secondary" onClick={() => setShowAddModal(name)}>
					Add
					{' '}
					{name}
				</Button>
			</div>
			<div className={styles.map_container}>
				{data
					? data.map((item) => (
						<div className={styles.data_container}>
							<div className={styles.data_display}>
								{/* <span className={styles.name}>Name :&nbsp;</span> */}
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
						<Modal.Header title="Are you sure to Delete this announcement" />
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
									onClick={() => deleteAttachment(showDeleteModal?.id, index)}
								>
									Delete
								</Button>
							</div>
						</Modal.Footer>
					</Modal>
				)}

				{!isEmpty(showEditModal) && (
					<Modal
						show={showEditModal}
						scroll={false}
						size="md"
						placement="center"
						onClose={() => setShowEditModal(null)}
					>
						<Modal.Header title="Are you sure to Edit this announcement" />
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
									onClick={() => editFunction(showEditModal, showEditModal?.document_type)}
								>
									Update
								</Button>
							</div>
						</Modal.Footer>
					</Modal>
				)}
				{!isEmpty(showAddModal) && (
					<Modal
						show={showAddModal}
						scroll={false}
						size="md"
						placement="center"
						onClose={() => setShowAddModal(null)}
					>
						<Modal.Header title="Are you sure to Add this announcement" />
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
									onClick={() => addFunction(showAddModal)}
								>
									Add
								</Button>
							</div>
						</Modal.Footer>
					</Modal>
				)}
			</div>
		</div>
	);
}

export default DisplayAttachment;
