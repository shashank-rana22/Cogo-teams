import { Button, Modal, Textarea } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function AcceptAudit({
	item = {},
	remarks = {},
	setRemarks = () => {},
	updateInvoice = () => {},
}) {
	const [openModal, setOpenModal] = useState(false);
	const [type, setType] = useState('');

	if (['APPROVED', 'REJECTED'].includes(item?.status)) {
		return <div>{item?.status}</div>;
	}

	const handleClick = (status) => {
		setType(status);
		setOpenModal(item?.id);
	};

	const onSubmit = (value, invoice_id) => {
		updateInvoice(type, value, invoice_id);
		setRemarks({});
	};
	const handleRemarkChange = (value) => {
		setRemarks((p) => {
			const newValue = { ...p };
			newValue[item?.id] = value;
			return newValue;
		});
	};

	return (
		<div className={styles.button_container}>
			<Button
				themeType="secondary"
				onClick={() => handleClick('REJECTED')}
				className={styles.button}
			>
				Reject
			</Button>

			<Button
				onClick={() => handleClick('APPROVED')}
				className={styles.button}
			>
				Accept
			</Button>

			{openModal
			&& (
				<Modal show={openModal} onClose={() => setOpenModal(false)} size="sm">
					<Modal.Header title="Remarks" />
					<Modal.Body>
						<Textarea
							name="remarks"
							value={remarks?.[item?.id]}
							onChange={(val) => handleRemarkChange(val)}
							placeholder="Enter Remark Here"
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="primary"
							disabled={!remarks}
							onClick={() => onSubmit(remarks?.[item?.id], item?.id)}
						>
							Submit
						</Button>
					</Modal.Footer>

				</Modal>
			)}
		</div>
	);
}

export default AcceptAudit;
