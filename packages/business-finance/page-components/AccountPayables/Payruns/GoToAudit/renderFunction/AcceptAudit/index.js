import { Button, Modal, Textarea } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

const STATUS = ['APPROVED', 'REJECTED'];

function AcceptAudit({
	item = {},
	remarks = [],
	setRemarks = () => {},
	updateInvoice = () => {},
	updateLoading = false,
}) {
	const [openModal, setOpenModal] = useState(false);
	const [type, setType] = useState('');

	if (STATUS.includes(item?.status)) {
		return <div>{item?.status}</div>;
	}

	const handleClick = (status) => {
		setType(status);
		setOpenModal(true);
	};

	const onSubmit = ({ value, invoice_id }) => {
		updateInvoice({ type, payload: value, invoice_id });
		setRemarks([]);
	};
	const handleRemarkChange = (value) => {
		setRemarks((prev) => ({
			...prev,
			[item?.id]: value,
		}));
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
				? (
					<Modal show={openModal} onClose={() => setOpenModal(false)} size="sm">
						<Modal.Header title="Remarks" />
						<Modal.Body>
							<Textarea
								name="remarks"
								value={remarks?.[item?.id]}
								onChange={handleRemarkChange}
								placeholder="Enter Remark Here"
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button
								themeType="primary"
								disabled={!(remarks?.[item?.id])}
								loading={updateLoading}
								onClick={() => onSubmit({ value: remarks?.[item?.id], invoice_id: item?.id })}
							>
								Submit
							</Button>
						</Modal.Footer>

					</Modal>
				) : null }
		</div>
	);
}

export default AcceptAudit;
