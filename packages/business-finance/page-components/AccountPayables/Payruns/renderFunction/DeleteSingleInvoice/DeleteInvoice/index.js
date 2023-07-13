import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import React from 'react';

import useDeleteInvoice from '../../../hooks/useDeleteInvoice';

import styles from './styles.module.css';

function DeleteInvoice({
	itemData = {},
	showDeleteInvoiceModal = false,
	setShowDeleteInvoiceModal = () => {},
	overseasData = '',
}) {
	const { id } = itemData;
	const {
		deleteinvoiceLoading,
		deleteInvoice,
	} = useDeleteInvoice({ overseasData, setShowDeleteInvoiceModal });
	return (
		<div>
			<Modal
				size="sm"
				show={showDeleteInvoiceModal}
				onClose={() => setShowDeleteInvoiceModal(false)}
				placement="top"
			>
				<Modal.Header
					title={<IcCError height={40} width={40} />}
					className={styles.header}
				/>
				<Modal.Body>
					<div className={styles.body}>
						Are you sure you want to delete this Invoice
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="secondary"
						onClick={() => setShowDeleteInvoiceModal(false)}
						style={{ marginRight: '20px' }}
					>
						Cancel
					</Button>
					<Button
						disabled={deleteinvoiceLoading}
						onClick={deleteInvoice(id)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default DeleteInvoice;
