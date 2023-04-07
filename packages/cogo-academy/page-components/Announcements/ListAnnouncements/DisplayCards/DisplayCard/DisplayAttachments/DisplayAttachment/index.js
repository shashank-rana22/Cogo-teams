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
		isAllowedToEdit = false,
		index,
		deleteAttachment = () => {},
		loadingUpdateAttachment = false,
		loadingAddAttachment = false,
		editAttachment = () => {},
		addAttachment = () => {},
		announcement_id,
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

				{isAllowedToEdit && (
					<Button type="button" size="sm" themeType="secondary" onClick={() => setShowAddModal(name)}>
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
							<div
								style={{ width: `${isAllowedToEdit ? '50%' : '80%'}` }}
								className={styles.data_display}
							>
								<span className={styles.name_data}>{item?.document_url}</span>
							</div>

							<div className={styles.buttoncontainer}>
								<Button
									type="button"
									themeType="primary"
									size="sm"
									style={{ marginRight: 8 }}
									onClick={() => openDocument(item?.document_url)}
								>
									View
								</Button>
								{isAllowedToEdit && (
									<>
										<Button
											type="button"
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
						loading={loadingUpdateAttachment}
						deleteAttachment={deleteAttachment}
						index={index}
					/>
				) : null}

				{!isEmpty(showEditModal) ? (
					<EditModal
						setShowEditModal={setShowEditModal}
						showEditModal={showEditModal}
						name={name}
						loading={loadingUpdateAttachment}
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
						loading={loadingAddAttachment}
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
