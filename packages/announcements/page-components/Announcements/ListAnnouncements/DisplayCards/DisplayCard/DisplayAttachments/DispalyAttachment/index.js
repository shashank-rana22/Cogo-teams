/* eslint-disable no-undef */
import { Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function DisplayAttachment({ data = {}, name, index, deleteAttachment = () => {} }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
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
							<span className={styles.name_data}>{item?.document_name}</span>
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
								// onClick={() => editDetails()}
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
								<Modal.Header title="Are you sure to delete this announcement" />
								<Modal.Footer>
									<div className={styles.delete_buttons}>
										<Button
											themeType="secondary"
											size="md"
											onClick={() => setShowDeleteModal(false)}
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
					</div>
				))}
			</div>
		</div>
	);
}

export default DisplayAttachment;
