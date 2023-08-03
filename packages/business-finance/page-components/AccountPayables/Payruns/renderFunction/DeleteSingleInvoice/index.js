import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React, { useState } from 'react';

import DeleteInvoice from './DeleteInvoice';

function DeleteSingleInvoice({ itemData = {}, overseasData = '', refetch = () => {} }) {
	const [showDeleteInvoiceModal, setShowDeleteInvoiceModal] = useState(false);

	return (
		<div>
			<Button themeType="tertiary" onClick={() => setShowDeleteInvoiceModal(true)}>
				<IcMDelete height={20} width={20} color="#EE3425" />
			</Button>
			{showDeleteInvoiceModal
				? (
					<DeleteInvoice
						itemData={itemData}
						showDeleteInvoiceModal={showDeleteInvoiceModal}
						setShowDeleteInvoiceModal={setShowDeleteInvoiceModal}
						overseasData={overseasData}
						refetch={refetch}
					/>
				) : null}
		</div>
	);
}

export default DeleteSingleInvoice;
