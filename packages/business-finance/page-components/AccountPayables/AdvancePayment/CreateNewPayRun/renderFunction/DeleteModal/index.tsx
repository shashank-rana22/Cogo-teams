import { Modal, Button } from '@cogoport/components';
import { IcCError, IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

interface ItemProps {
	id:string;
}
interface PropsType {
	itemData:ItemProps,
	deleteSelecteInvoiceLoading:boolean,
	deleteInvoices:Function;
}
function DeleteModal({
	itemData, deleteSelecteInvoiceLoading,
	deleteInvoices,
}:PropsType) {
	const { id } = itemData || {};

	const [openDeleteModal, setopenDeleteModal] = useState(false);
	const handleCloseModal = () => {
		setopenDeleteModal(false);
	};

	return (
		<div>
			<IcMDelete
				onClick={() => setopenDeleteModal(true)}
				height={20}
				width={20}
				className={styles.delete}
			/>

			{openDeleteModal && (
				<Modal show={openDeleteModal} onClose={handleCloseModal} size="sm">
					<div className={styles.container}>
						<div className={styles.icon}>
							<IcCError width={28} height={28} />
						</div>
						<div className={styles.icon}>
							Are you sure You want to delete this PayRun Bill
						</div>
					</div>
					<Modal.Footer>
						<Button
							className={styles.button}
							themeType="secondary"
							onClick={() => setopenDeleteModal(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={() => deleteInvoices(id)}
							disabled={deleteSelecteInvoiceLoading}
						>
							Yes
						</Button>
					</Modal.Footer>

				</Modal>
			)}
		</div>
	);
}

export default DeleteModal;
