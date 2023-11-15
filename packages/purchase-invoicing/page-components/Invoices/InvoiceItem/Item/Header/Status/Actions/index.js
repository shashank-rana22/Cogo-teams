import { cl, Button } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import React, { useState } from 'react';

import KebabContent from './Components/KebabContent';
import styles from './styles.module.css';

const EditInvoice = dynamic(() => import('../../../../../EditInvoice/index'), { ssr: false });
const MarkInactive = dynamic(() => import('./MarkInactive'), { ssr: false });
const ApproveInvoice = dynamic(() => import('./ApproveInvoice'), { ssr: false });

function Actions({
	invoice = {},
	refetch = () => {},
}) {
	const [showModal, setShowModal] = useState('');

	const onModalClose = () => setShowModal('');

	return (
		<div className={styles.container}>
			<div className={cl`${styles.actions_wrap} ${styles.statuses}`}>
				{invoice?.status === 'pending' ? (
					<Button
						size="sm"
						onClick={() => setShowModal('approve_invoice')}
					>
						Mark as approved
					</Button>
				) : null}
			</div>

			<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>

				<KebabContent
					invoice={invoice}
					setShowModal={setShowModal}
				/>

			</div>

			{showModal === 'mark_inactive' ? (
				<MarkInactive
					show={showModal === 'mark_inactive'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{(invoice?.services || []).length && showModal === 'edit_invoice' ? (
				<EditInvoice
					show={showModal === 'edit_invoice'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showModal === 'approve_invoice' ? (
				<ApproveInvoice
					show={showModal === 'approve_invoice'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

		</div>
	);
}

export default Actions;
