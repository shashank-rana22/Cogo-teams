import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import React from 'react';

import useDeleteSelectedInvoice from '../../../../hooks/useDeleteSelectedInvoice';
import styles from '../styles.module.css';

function DeleteModal({ show, setShow, refetch, itemData }) {
	const { onDelete, loading } = useDeleteSelectedInvoice({ refetch, itemData });

	return (
		<div>
			<Modal
				show={show}
				size="sm"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShow(false)}
				className={styles.modal}
			>
				<Modal.Header title="Delete" />
				<Modal.Body>
					<div className={styles.container}>
						<div className={styles.icon}>
							<IcCError width={28} height={28} />
						</div>
						<div className={styles.icon}>
							Are you sure You want to delete this invoice (
							{itemData?.invoiceNumber || ''}
							)
						</div>
					</div>
				</Modal.Body>
				<div className={styles.yes}>
					<Button
						size="md"
						themeType="primary"
						loading={loading}
						onClick={onDelete}
					>
						Yes
					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default DeleteModal;
