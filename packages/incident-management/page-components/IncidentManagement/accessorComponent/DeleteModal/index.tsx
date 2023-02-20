import { ButtonIcon, Textarea, Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useDeleteAccept from '../../hooks/useDeleteAccept';

import styles from './styles.module.css';

function DeleteModal({ itemData, refetch }) {
	const { id, userIncidentStatus, status } = itemData || {};
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [remarks, setRemarks] = useState(null);
	const { onDeleteAccept, loadingOndelete } = useDeleteAccept({ id, userIncidentStatus, remarks, refetch });
	return (
		<div>
			<div className={styles.button_style}>
				{status === 'REJECTED' ? (
					<Button
						disabled={userIncidentStatus === 'ACCEPTED' || userIncidentStatus === 'RAISED_AGAIN'}
						themeType="secondary"
						onClick={() => { setShowDeleteModal(true); }}
					>
						Accept
					</Button>
				)
					: (
						<ButtonIcon
							size="xl"
							onClick={() => { setShowDeleteModal(true); }}
							disabled={userIncidentStatus === 'DELETED'}
							icon={(
								<IcMDelete
									color=" #ED3726"
									height={20}
									width={20}

								/>
							)}
							themeType="primary"
						/>

					)}
			</div>
			<Modal show={showDeleteModal} size="md" onClose={() => setShowDeleteModal(false)}>
				{status === 'REJECTED' ? <Modal.Header className={styles.header} title="Accept Request" />
					: <Modal.Header className={styles.header} title="Delete Request" />}

				<Modal.Body>
					<section>
						The Original request and all details related to it will be
						{status === 'REJECTED' ? ' Accepted' : ' deleted'}

					</section>
					{status !== 'REJECTED'
					&& (
						<div className={styles.remarks_style}>
							Remarks*
							<Textarea
								name="remarks"
								className={styles.text_area}
								size="lg"
								placeholder="Enter Remarks here..."
								onChange={(values) => setRemarks(values)}
							/>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						style={{ marginRight: 10 }}
						themeType="secondary"
						onClick={() => { setShowDeleteModal(false); }}
					>
						Cancel
					</Button>
					<Button
						size="md"
						disabled={loadingOndelete}
						onClick={() => {
							onDeleteAccept();
							// setShowDeleteModal(false);
						}}
					>
						{status === 'REJECTED' ? 'Accept' : 'Delete'}

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeleteModal;
