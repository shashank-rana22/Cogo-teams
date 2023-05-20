import { Modal, Button, Toast } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

interface PropsType {
	savePayrunModal:boolean,
	setSavePayrunModal:Function,
	setViewSelectedInvoice:Function,
}

function SavePayRunModal({
	savePayrunModal,
	setSavePayrunModal,
	setViewSelectedInvoice,
}:PropsType) {
	const { push } = useRouter();
	const handleCloseModal = () => {
		setSavePayrunModal(false);
	};

	const handleClick = () => {
		setViewSelectedInvoice(false);
		push(
			'/business-finance/account-payables/[active_tab]',
			'/business-finance/account-payables/advance-payment',
		);
		setSavePayrunModal(false);
		Toast.success('Please wait while PayRun Saves...');
	};

	return (
		<div>
			<Modal show={savePayrunModal} onClose={handleCloseModal} size="sm">
				<div className={styles.container}>
					<div className={styles.icon}>
						<IcCError width={28} height={28} />
					</div>
					<div className={styles.icon}>
						Are you sure You want to Save this payrun
					</div>
				</div>
				<Modal.Footer>
					<Button
						className={styles.button}
						themeType="secondary"
						onClick={() => setSavePayrunModal(false)}
					>
						Cancel
					</Button>
					<Button onClick={handleClick}>
						Yes
					</Button>
				</Modal.Footer>

			</Modal>
		</div>
	);
}

export default SavePayRunModal;
