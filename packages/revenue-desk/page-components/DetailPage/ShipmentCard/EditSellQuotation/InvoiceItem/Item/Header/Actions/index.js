import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EditInvoice from './EditInvoice';
import styles from './styles.module.css';

function Actions({ invoice = {}, refetch = () => {}, shipment_data = {} }) {
	const [isEditInvoice, setIsEditInvoice] = useState(false);

	const handleRefetch = () => {
		refetch();
	};

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<Button onClick={() => setIsEditInvoice(true)}>
						Edit Line Items
					</Button>
				</div>
			</div>

			{!isEmpty(invoice.services) && isEditInvoice ? (
				<EditInvoice
					show={isEditInvoice}
					onClose={() => setIsEditInvoice(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			) : null}
		</div>
	);
}

export default Actions;
