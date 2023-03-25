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
		status = '',
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

				{status === 'draft' && (
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
							<div
								style={{ width: `${status === 'draft' ? '50%' : '80%'}` }}
								className={styles.data_display}
							>
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
								{status === 'draft' && (
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
