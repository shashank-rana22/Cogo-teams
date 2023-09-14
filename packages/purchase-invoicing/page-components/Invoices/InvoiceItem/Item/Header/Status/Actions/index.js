import { cl, Button } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import React, { useState } from 'react';

import useUpdateCrossEntityStatus from '../../../../../../../hooks/useUpdateCrossEntityStatus';

import KebabContent from './Components/KebabContent';
import styles from './styles.module.css';

const EditInvoice = dynamic(() => import('../../../../../Header/EditInvoice/index'), { ssr: false });

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
}) {
	const { loading, updateStatus } = useUpdateCrossEntityStatus();
	const [showModal, setShowModal] = useState('');

	const onModalClose = () => setShowModal('');

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						<Button
							size="sm"
							onClick={() => updateStatus({ invoice_id: invoice?.id, status: 'approved', refetch })}
							disabled={invoice?.status !== 'pending'}
							loading={loading}
						>
							Mark as approved
						</Button>
					</div>
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

		</div>
	);
}

export default Actions;
