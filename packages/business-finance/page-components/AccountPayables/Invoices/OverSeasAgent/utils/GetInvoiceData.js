import { Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetInvoiceData({
	selectBankShow = false,
	setShowConfirmationModal = () => {}, list = [],
}) {
	return (
		selectBankShow
			? (
				<div style={{ display: 'flex' }}>
					<IcCFtick />
					<div className={styles.success}>
						Invoices successfully merged
					</div>
				</div>
			)
			:						(
				<Button
					onClick={() => setShowConfirmationModal(true)}
					disabled={!list?.length}
				>
					Merge Invoices
				</Button>
			)
	);
}

export default GetInvoiceData;
