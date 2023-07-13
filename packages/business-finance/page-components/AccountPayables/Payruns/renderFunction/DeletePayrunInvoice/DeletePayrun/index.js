import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import React from 'react';

import useDeletePayrun from '../../../hooks/useDeletePayrun';

import styles from './styles.module.css';

function DeletePayrun({ itemData = {}, overseasData = '', showDeleteModal = false, setShowDeleteModal = () => {} }) {
	const { id } = itemData || {};
	const {
		deletePayrun,
		deletePayrunLoading,
	} = useDeletePayrun({ overseasData, setShowDeleteModal });
	return (
		<div>
			<Modal size="sm" show={showDeleteModal} onClose={() => setShowDeleteModal(false)} placement="top">
				<Modal.Header
					title={<IcCError height={40} width={40} />}
					className={styles.header}
				/>
				<Modal.Body>
					<div className={styles.body}>
						Are you sure you want to delete this Payrun
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						id="cancel-trash--invoice"
						themeType="secondary"
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						disabled={deletePayrunLoading}
						onClick={deletePayrun(id)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeletePayrun;
