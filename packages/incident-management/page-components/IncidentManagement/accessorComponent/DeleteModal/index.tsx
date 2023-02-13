import { Textarea, Button, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function DeleteModal() {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	return (
		<div>
			<div className={styles.buttonStyle}>
				<IcMDelete color=" #ED3726" height={20} width={20} onClick={() => { setShowDeleteModal(true); }} />
			</div>
			<Modal show={showDeleteModal} size="md" onClose={() => setShowDeleteModal(false)}>
				<Modal.Header className={styles.header} title="Delete Request" />
				<Modal.Body>
					<section>
						The Original request and all details related to it will be deleted
					</section>
					<div className={styles.remarks_style}>
						Remarks*
						<Textarea
							name="remarks"
							className={styles.text_area}
							size="lg"
							placeholder="Enter Remarks here..."
						/>
					</div>
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
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeleteModal;
