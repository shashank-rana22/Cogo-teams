import { Modal, Textarea, Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateInvoice from '../../../../hooks/useUpdateInvoice';

import styles from './styles.module.css';

function RemarksModal({
	actionType = '',
	setRemarksModal = () => {},
	invoiceNumber = '',
	refetch = () => {},
	itemData = {},
}) {
	const [remark, setRemark] = useState('');

	const { updateInvoice = () => {}, remarksLoading = false } = useUpdateInvoice({
		setRemarksModal,
		refetch,
		itemData,
	});

	return (
		<Modal show={setRemarksModal} onClose={() => setRemarksModal(false)} size="md">
			<Modal.Body>
				<div className={styles.bold}>
					REMARK FOR
					<span className={styles.span}>{actionType || ''}</span>
				</div>
				<div className={styles.invoice}>
					Invoice No.
					<span className={styles.span}>{invoiceNumber || ''}</span>
				</div>
				<Textarea
					value={remark}
					onChange={setRemark}
					size="md"
					placeholder="Remarks....."
				/>

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer_button}>
					<Button
						themeType="secondary"
						onClick={() => setRemarksModal(false)}
					>
						Back
					</Button>
					<Button
						onClick={() => updateInvoice(remark, actionType)}
						disabled={!remark || remarksLoading}
						className={styles.send_button}
					>
						Send Remark
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default RemarksModal;
