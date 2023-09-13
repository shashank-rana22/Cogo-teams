import { cl } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import React, { useState } from 'react';

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
