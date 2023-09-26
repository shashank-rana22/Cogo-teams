import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import React from 'react';

import useDeletePayrun from '../../../hooks/useDeletePayrun';

import styles from './styles.module.css';

function DeletePayrun({
	itemData = {}, overseasData = '', showDeleteModal = false, setShowDeleteModal = () => {},
	refetch = () => {},
}) {
	const { id } = itemData || {};
	const {
		deletePayrun,
		deletePayrunLoading,
	} = useDeletePayrun({ overseasData, setShowDeleteModal, refetch });
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
						type="reset"
						themeType="secondary"
						style={{ marginRight: '20px' }}
						onClick={() => setShowDeleteModal(false)}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={deletePayrunLoading}
						onClick={() => deletePayrun(id)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeletePayrun;
