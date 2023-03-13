/* eslint-disable no-undef */
import { Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function DisplayAttachment({ data = {}, name, index, deleteAttachment = () => {} }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const openDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}
		window.open(modifiedUrl, '_blank');
	};

	// console.log('data', data);
	return (
		<div className={styles.conatiner}>
			<div>
				Document Type :&nbsp;
				{name}
			</div>
			<div className={styles.map_conatiner}>
				{data.map((item) => (
					<div className={styles.data_container}>
						<div className={styles.data_display}>
							<span className={styles.name}>Name :&nbsp;</span>
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
								onClick={() => setShowEditModal(true)}
							>
								Edit
							</Button>
							<IcMDelete
								height={20}
								width={20}
								style={{ cursor: 'pointer' }}
								onClick={() => setShowDeleteModal(true)}
							/>
						</div>

						{setShowDeleteModal && (
							<Modal
								show={showDeleteModal}
								scroll={false}
								size="md"
								placement="center"
								onClose={() => setShowDeleteModal(false)}
							>
								<Modal.Header title="Are you sure to Delete this announcement" />
								<Modal.Footer>
									<div className={styles.delete_buttons}>
										<Button
											themeType="secondary"
											size="md"
											onClick={() => setShowDeleteModal(false)}
											style={{ marginRight: '20px' }}
										>
											Cancel
										</Button>
										<Button
											themeType="primary"
											size="md"
											onClick={() => deleteAttachment(item?.id, index)}

										>
											Delete
										</Button>
									</div>
								</Modal.Footer>
							</Modal>
						)}

						{setShowEditModal && (
							<Modal
								show={showEditModal}
								scroll={false}
								size="md"
								placement="center"
								onClose={() => setShowEditModal(false)}
							>
								<Modal.Header title="Are you sure to Edit this announcement" />
								<Modal.Body>
									{name === 'Image' ? <div>Image</div> : null}
									{name === 'Files' ? <div>Files</div> : null}
									{name === 'Video' ? <div>Video</div> : null}
								</Modal.Body>
								<Modal.Footer>
									<div className={styles.delete_buttons}>
										<Button
											themeType="secondary"
											size="md"
											onClick={() => setShowEditModal(false)}
											style={{ marginRight: '20px' }}
										>
											Cancel
										</Button>
										<Button
											themeType="primary"
											size="md"
											onClick={() => editAttachment(item?.id)}
										>
											Delete
										</Button>
									</div>
								</Modal.Footer>
							</Modal>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default DisplayAttachment;
