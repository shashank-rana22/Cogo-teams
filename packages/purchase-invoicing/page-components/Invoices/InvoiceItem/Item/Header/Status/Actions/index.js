import { cl, Button } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import React, { useState } from 'react';

import ApproveInvoice from './ApproveInvoice';
import KebabContent from './Components/KebabContent';
import styles from './styles.module.css';

const EditInvoice = dynamic(() => import('../../../../../Header/EditInvoice/index'), { ssr: false });

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
}) {
	const [showModal, setShowModal] = useState('');

	const onModalClose = () => setShowModal('');

	return (
		<div className={styles.container}>
			<div className={styles.actions_wrap}>
				<div className={styles.statuses}>
					{invoice?.status === 'pending' ? (
						<Button
							size="sm"
							onClick={() => setShowModal('approve_invoice')}
						>
							Mark as approved
						</Button>
					) : null}

				</div>
			</div>

			<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>

				<KebabContent
					invoice={invoice}
					setShowModal={setShowModal}
				/>

			</div>

			{(invoice?.services || []).length && showModal === 'edit_invoice' ? (
				<EditInvoice
					show={showModal === 'edit_invoice'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showModal === 'approve_invoice' && (
				<ApproveInvoice
					show={showModal === 'approve_invoice'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			)}

		</div>
	);
}

export default Actions;
