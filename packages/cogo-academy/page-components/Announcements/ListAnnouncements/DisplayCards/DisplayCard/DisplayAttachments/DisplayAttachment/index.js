import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import openDocument from '../../../../../../../commons/OpenDocument';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
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
		isValid,
	},
) {
	const [showDeleteModal, setShowDeleteModal] = useState(null);
	const [showEditModal, setShowEditModal] = useState(null);
	const [showAddModal, setShowAddModal] = useState(null);

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					Media Type :&nbsp;
					{name}
				</div>

				{isValid !== -1 && (
					<Button type="add" size="sm" themeType="secondary" onClick={() => setShowAddModal(name)}>
						Add
						{' '}
						{name}
					</Button>
				)}
			</div>
			<div className={styles.map_container}>
				{data
					? data.map((item) => (
						<div key={item.id} className={styles.data_container}>
							<div style={{ width: `${isValid !== -1 ? '50%' : '80%'}` }} className={styles.data_display}>
								<span className={styles.name_data}>{item?.document_url}</span>
							</div>

							<div className={styles.buttoncontainer}>
								<Button
									type="view"
									themeType="primary"
									size="sm"
									style={{ marginRight: 8 }}
									onClick={() => openDocument(item?.document_url)}
								>
									View
								</Button>
								{isValid !== -1 && (
									<>
										<Button
											type="edit"
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
					: <div className={styles.nodisplay}> No Attachment </div>}

				{!isEmpty(showDeleteModal) ? (
					<DeleteModal
						setShowDeleteModal={setShowDeleteModal}
						showDeleteModal={showDeleteModal}
						deleteAttachment={deleteAttachment}
						index={index}
					/>
				) : null}

				{!isEmpty(showEditModal) ? (
					<EditModal
						setShowEditModal={setShowEditModal}
						showEditModal={showEditModal}
						name={name}
						index={index}
						editAttachment={editAttachment}
					/>
				) : null}

				{!isEmpty(showAddModal) ? (
					<AddModal
						setShowAddModal={setShowAddModal}
						showAddModal={showAddModal}
						addAttachment={addAttachment}
						name={name}
						index={index}
						announcement_id={announcement_id}
					/>
				)
					: null}

			</div>
		</div>
	);
}

export default DisplayAttachment;
